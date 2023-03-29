import { connectToDatabase } from "../../../lib/externalDB";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const session = await getServerSession(req, res, authOptions);

            if (!session) {
                return;
            }

            const mongoClient = await connectToDatabase();
            const database = process.env.mongodbDatabase;
            const collection = process.env.mongodbUsersCollection;
            const users = mongoClient.db(database).collection(collection);
            const existingUser = await users.findOne({ email: session.user.email });

            let userItems;
            if (existingUser) {
                userItems = existingUser.items;
            }
            mongoClient.close();

            res.status(200).json({ items: userItems });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error fetching items" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}

export default handler;
