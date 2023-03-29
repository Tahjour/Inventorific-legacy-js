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
            // Check if the user is authenticated
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

                // Define the existing image public ID
                const existingImagePublicId = `${process.env.CLOUDINARY_MAIN_FOLDER}/${fields.itemToDeleteName}(${fields.itemToDeleteID})`;

                // Delete the existing image from Cloudinary
                const existingImageDestroyRes = await cloudinary.uploader.destroy(existingImagePublicId);
                if (existingImageDestroyRes.result !== 'ok') {
                    res.status(500).json({ message: "Failed to delete the existing image on server" });
                }

                // Connect to the MongoDB database
                const mongoClient = await connectToDatabase();
                const database = process.env.mongodbDatabase;
                const collection = process.env.mongodbUsersCollection;
                const users = mongoClient.db(database).collection(collection);

                // Find the existing user in the database
                const existingUser = await users.findOne({ email: session.user.email });

                // Delete the item for the existing user
                if (existingUser) {
                    const deleteRes = await users.updateOne(
                        { email: session.user.email },
                        { $pull: { items: { id: fields.itemToDeleteID } } }
                    );
                    // Send a response after the deletion
                    res.status(201).json({ messages: "Item Deleted!", deleteRes });
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
    } else {
        // If the request method is not POST, send a "Method not allowed" error
        res.status(405).json({ error: "Method not allowed" });
    }
}

// Export the default handler
export default handler;