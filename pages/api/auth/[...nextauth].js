import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { comparePasswords } from "../../../lib/authHelper";
import mongoClientPromise, { connectToDatabase } from "../../../lib/externalDB";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

export const authOptions = {
    // adapter: MongoDBAdapter(mongoClientPromise, { databaseName: process.env.mongodbDatabase }),
    // Configure one or more authentication providers
    session: { strategy: "jwt" },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SEC,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                const mongoClient = await connectToDatabase();
                const database = process.env.mongodbDatabase;
                const collection = process.env.mongodbUsersCollection;
                const users = mongoClient.db(database).collection(collection);
                const user = await users.findOne({ email: credentials.email });
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
                return user;
            }
        })
    ],
    callbacks: {
        async signIn(params) {
            if (params.account.type === "oauth") {
                const mongoClient = await connectToDatabase();
                const database = process.env.mongodbDatabase;
                const collection = process.env.mongodbUsersCollection;
                const users = mongoClient.db(database).collection(collection);
                const existingUser = await users.findOne({ email: params.user.email });
                if (existingUser) {
                    return true;
                }
                // Create a new Date object for the current date and time
                const currentDate = new Date();
                // Get the day, month, and year
                const day = currentDate.getDate();
                const month = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
                const year = currentDate.getFullYear();
                // Format the date as a string
                const formattedDate = `${month}/${day}/${year}`;

                const userDoc = {
                    type: params.account.type,
                    created: formattedDate,
                    ...params.user,
                    items: []
                };
                await users.insertOne(userDoc).catch(error => {
                    console.error('Error adding user:', error);
                });
                mongoClient.close();
            }
            return true;
        }
    },
};

export default NextAuth(authOptions);