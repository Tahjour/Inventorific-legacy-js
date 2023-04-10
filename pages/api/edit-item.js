import { connectToDatabase } from "../../lib/externalDB";
import { v2 as cloudinary } from "cloudinary";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import formidable from "formidable";

// API configuration to disable the default bodyParser
export const config = {
    api: {
        bodyParser: false
    }
};

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

/**
 * The handler function for the API endpoint that processes the request to edit an item
 * and updates the corresponding image in Cloudinary, if necessary.
 * @param {Object} req - The HTTP request object
 * @param {Object} res - The HTTP response object
 */
async function handler(req, res) {
    // Check if the request method is POST, otherwise return a "Method not allowed" error
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    try {
        // Check if the user is authenticated, return an "Unauthorized" error if not
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        // Parse the FormData
        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files) => {
            // Return an error if there was an issue processing the form data
            if (err) {
                console.error(err);
                res.status(500).json({ message: "Error processing the form data" });
                return;
            }

            const {
                itemBeforeEditID,
                itemBeforeEditName,
                itemBeforeEditImageURL,
                itemAfterEditID,
                itemAfterEditName,
                itemAfterEditPrice,
                itemAfterEditDescription,
                itemAfterEditImageURL,
            } = fields;

            const itemAfterEditImageFile = files.itemAfterEditImageFile
                ? files.itemAfterEditImageFile.filepath
                : null;

            const updatedImageURL = await updateItemImage(
                itemBeforeEditImageURL,
                itemBeforeEditName,
                itemBeforeEditID,
                itemAfterEditImageFile,
                itemAfterEditImageURL,
                itemAfterEditName,
                itemAfterEditID,
                res, session
            );

            // Create the edited item object
            const itemAfterEdit = {
                id: itemAfterEditID,
                name: itemAfterEditName,
                price: itemAfterEditPrice,
                description: itemAfterEditDescription,
                imageURL: updatedImageURL,
            };

            // Connect to the MongoDB database
            const mongoClient = await connectToDatabase();
            const database = process.env.mongodbDatabase;
            const collection = process.env.mongodbUsersCollection;
            const users = mongoClient.db(database).collection(collection);

            // Find the existing user in the database
            const existingUser = await users.findOne({ email: session.user.email });

            // Update the item for the existing user
            if (existingUser) {
                const updateRes = await users.updateOne(
                    { email: session.user.email, "items.id": fields.itemAfterEditID },
                    { $set: { "items.$": itemAfterEdit } }
                );
                // Send a response after the update
                res.status(201).json({ messages: "Success!", itemAfterEdit, updateRes });
            } else {
                // Handle the case when no user is found
                res.status(404).json({ message: "User not found" });
            }
            // Close the MongoDB connection
            mongoClient.close();
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error processing the request" });
    }
}

async function updateItemImage(
    itemBeforeEditImageURL,
    itemBeforeEditName,
    itemBeforeEditID,
    itemAfterEditImageFile,
    itemAfterEditImageURL,
    itemAfterEditName,
    itemAfterEditID,
    res, session
) {
    const mainFolder = `${process.env.CLOUDINARY_MAIN_FOLDER}`;
    const userFolder = `${session.user.name}(${session.user.email})`;
    const userItemImageBefore = `${itemBeforeEditName}(${itemBeforeEditID})`;
    const userItemImageAfter = `${itemAfterEditName}(${itemAfterEditID})`;
    const existingImagePublicId = `${mainFolder}/${userFolder}/${userItemImageBefore}`;
    const newImagePublicId = `${mainFolder}/${userFolder}/${userItemImageAfter}`;
    const defaultImageURL = process.env.CLOUDINARY_DEFAULT_IMAGE_URL;

    if (itemAfterEditImageFile) {
        if (itemBeforeEditImageURL !== defaultImageURL) {
            const destroyResponse = await cloudinary.uploader.destroy(existingImagePublicId);
            if (destroyResponse.result !== 'ok') {
                res.status(500).json({ message: "Failed to delete the existing image on server" });
            }
        }
        const uploadResponse = await cloudinary.uploader.upload(itemAfterEditImageFile, {
            public_id: newImagePublicId,
        });
        return uploadResponse.secure_url;
    } else {
        if (itemAfterEditImageURL === defaultImageURL || existingImagePublicId === newImagePublicId) {
            return itemAfterEditImageURL;
        }
        return (await cloudinary.uploader.rename(existingImagePublicId, newImagePublicId)).secure_url;
    }
}

// Export the default handler
export default handler;
