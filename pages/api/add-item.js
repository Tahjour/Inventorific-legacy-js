//pages/api/auth/add-item.js
import { connectToDatabase } from "../../lib/externalDB";
import { v2 as cloudinary } from "cloudinary";
import { authOptions } from "./auth/[...nextauth]";
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

                let newItemImageURL = process.env.CLOUDINARY_DEFAULT_IMAGE_URL;

                if (files.newItemImageFile) {
                    // Access the image file
                    const newItemImageFile = files.newItemImageFile.filepath;
                    const mainFolder = `${process.env.CLOUDINARY_MAIN_FOLDER}`;
                    const userFolder = `${session.user.name}(${session.user.email})`;
                    const userItemImage = `${fields.newItemName}(${fields.newItemID})`;
                    const newPublicID = `${mainFolder}/${userFolder}/${userItemImage}`;

                    // Upload image to Cloudinary
                    const uploadResponse = await cloudinary.uploader.upload(newItemImageFile, {
                        public_id: newPublicID,
                    });
                    newItemImageURL = uploadResponse.secure_url;
                }

                const newItem = {
                    id: fields.newItemID,
                    name: fields.newItemName,
                    price: fields.newItemPrice,
                    amount: fields.newItemAmount,
                    description: fields.newItemDescription,
                    imageURL: newItemImageURL,
                    createdDate: fields.newItemCreatedDate,
                    createdTime: fields.newItemCreatedTime,
                    modifiedDate: fields.newItemModifiedDate,
                    modifiedTime: fields.newItemModifiedTime
                };

                const mongoClient = await connectToDatabase();
                const database = process.env.mongodbDatabase;
                const collection = process.env.mongodbUsersCollection;
                const users = mongoClient.db(database).collection(collection);
                const existingUser = await users.findOne({ email: session.user.email });

                if (existingUser) {
                    const updateRes = await users.updateOne(
                        { email: session.user.email },
                        { $push: { items: newItem } }
                    ).catch(error => {
                        console.error('Error adding item:', error);
                        res.status(500).json({ message: 'Error adding item to database' });
                    });

                    res.status(201).json({ messages: "Success!", newItem, updateRes });
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
