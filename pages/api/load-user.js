import { connectToDatabase } from "../../lib/externalDB";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

async function handler(req, res) {
    if (req.method !== "GET") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    try {
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            res.status(401).json({ message: "User not signed it. Aborting server load" });
            return;
        }

        const mongoClient = await connectToDatabase();
        const database = process.env.mongodbDatabase;
        const collection = process.env.mongodbUsersCollection;
        const users = mongoClient.db(database).collection(collection);

        const existingUser = await users.findOne({ email: session.user.email });
        if (!existingUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const user = {
            createdDate: existingUser.created,
            items: existingUser.items
        };
        res.status(200).json({ message: "Items Loaded Successfully", user });
        try {
            if (mongoClient) {
                await mongoClient.close();
            }
        } catch (error) {
            console.error("Error closing MongoDB connection:", error);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching items" });
    }
}

export default handler;
