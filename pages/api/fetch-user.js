//pages/api/auth/add-item.js
import { connectToDatabase } from "../../lib/externalDB";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const session = await getServerSession(req, res, authOptions);

            if (!session) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const mongoClient = await connectToDatabase();
            const database = process.env.mongodbDatabase;
            const collection = process.env.mongodbUsersCollection;
            const users = mongoClient.db(database).collection(collection);
            const existingUser = await users.findOne({ email: session.user.email });

            if (existingUser) {
                const userInfo = {
                    createdDate: existingUser.created,
                    items: existingUser.items
                };
                res.status(201).json({ messages: "Success!", userInfo });
            } else {
                // Handle the case when no user is found
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
