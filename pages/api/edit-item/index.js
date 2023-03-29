import { connectToDatabase } from "../../../lib/externalDB";
import { v2 as cloudinary } from "cloudinary";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import formidable from "formidable";

export const config = {
    api: {
        bodyParser: false
    }
};

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const session = await getServerSession(req, res, authOptions);

            if (!session) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            // Parse the FormData
            const form = formidable({ multiples: true });
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: "Error processing the form data" });
                    return;
                }

                // Access the image file
                if (!files.editedItemImageFile.filepath) {
                    res.status(500).json({ message: "There is no edited image file" });
                }
                const editedItemImageFile = files.editedItemImageFile.filepath;

                const existingImagePublicId = `${process.env.CLOUDINARY_MAIN_FOLDER}/${fields.itemBeforeEditName}(${fields.itemBeforeEditID})`;

                const existingImageDestroyRes = await cloudinary.uploader.destroy(existingImagePublicId);
                if (existingImageDestroyRes.result !== 'ok') {
                    res.status(500).json({ message: "Failed to delete the existing image on server" });
                }

                // Upload image to Cloudinary
                const uploadResponse = await cloudinary.uploader.upload(editedItemImageFile, {
                    public_id: `${fields.editedItemName}(${fields.editedItemID})`,
                    folder: process.env.CLOUDINARY_MAIN_FOLDER,
                });

                const editedItemImageURL = uploadResponse.secure_url;

                const editedItem = {
                    id: fields.editedItemID,
                    name: fields.editedItemName,
                    price: fields.editedItemPrice,
                    description: fields.editedItemDescription,
                    imageURL: editedItemImageURL,
                };

                const mongoClient = await connectToDatabase();
                const database = process.env.mongodbDatabase;
                const collection = process.env.mongodbUsersCollection;
                const users = mongoClient.db(database).collection(collection);
                const existingUser = await users.findOne({ email: session.user.email });

                if (existingUser) {
                    const updateRes = await users.updateOne(
                        { email: session.user.email, "items.id": fields.editedItemID },
                        { $set: { "items.$": editedItem } }
                    );
                    // Add the following line to send a response after the update
                    res.status(201).json({ messages: "Success!", editedItem, updateRes });
                } else {
                    // Handle the case when no user is found
                    res.status(404).json({ message: "User not found" });
                }
                mongoClient.close();
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error processing the request" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}

export default handler;
