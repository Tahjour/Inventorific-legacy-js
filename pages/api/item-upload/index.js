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
                const image = files.image.filepath;

                // Upload image to Cloudinary
                const uploadResponse = await cloudinary.uploader.upload(image, {
                    folder: `Inventorific/${fields.name}(${fields.id})`, // Optional: specify a folder for your images
                });

                console.log(uploadResponse);

                const imagePath = uploadResponse.secure_url;

                const newItem = {
                    id: fields.id,
                    name: fields.name,
                    price: fields.price,
                    description: fields.description,
                    imagePath: imagePath,
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
                    );
                }

                res.status(201).json({ messages: "Success!", item: newItem });
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
