import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { comparePasswords } from "../../../lib/authHelper";
import { connectToDatabase } from "../../../lib/externalDB";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SEC
        }),
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                const mongoClient = await connectToDatabase();
                const database = process.env.mongodbDatabase;
                const collection = process.env.mongodbCollection;
                const inventorificUsersCollection = mongoClient.db(database).collection(collection);
                const user = await inventorificUsersCollection.findOne({ email: credentials.email });
                console.log(user);
                if (!user) {
                    mongoClient.close();
                    throw new Error("No user found");
                }
                const isValid = await comparePasswords(credentials.password, user.password);
                if (!isValid) {
                    mongoClient.close();
                    throw new Error("Invalid password");
                }
                mongoClient.close();
                return { email: user.email, name: user.username };
            }
        })
    ],
};

export default NextAuth(authOptions);