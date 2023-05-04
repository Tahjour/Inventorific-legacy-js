// pages/api/auth/delete-user.js
import { connectToDatabase } from "../../lib/externalDB";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

async function handler(req, res) {
    if (req.method === "DELETE") {
        try {
            const session = await getServerSession(req, res, authOptions);

            if (!session) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const mainFolder = `${process.env.CLOUDINARY_MAIN_FOLDER}`;
            const userFolder = `${session.user.name}(${session.user.email})`;
            const userFolderPublicId = `${mainFolder}/${userFolder}`;
            await cloudinary.api.delete_resources_by_prefix(userFolderPublicId).catch(e => {
                console.error(e);
                res.status(500).json({ error: e });
            });

            await cloudinary.api.delete_folder(userFolderPublicId).catch(e => {
                console.error(e);
                res.status(500).json({ error: e });
            });

            const mongoClient = await connectToDatabase();
            const database = process.env.mongodbDatabase;
            const collection = process.env.mongodbUsersCollection;
            const users = mongoClient.db(database).collection(collection);
            const existingUser = await users.findOne({ email: session.user.email }).catch(e => {
                console.error(e);
                res.status(500).json({ error: e });
            });

            if (existingUser) {
                await users.deleteOne({ email: session.user.email }).catch(e => {
                    console.error(e);
                    res.status(500).json({ error: e });
                });
                res.status(200).json({ message: "User and associated images deleted successfully" });
            } else {
                res.status(404).json({ message: "User not found" });
            }
            mongoClient.close();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error processing the request" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}

export default handler;
