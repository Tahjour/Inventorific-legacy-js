//*This is not currently being used.
import { hashPassword } from "../../../lib/authHelper";
import { connectToDatabase } from "../../../lib/externalDB";


async function signUpHandler(req, res) {
    if (req.method !== 'POST') {
        res.status(500).json({ message: "Only POST requests are allowed" });
        return;
    }

    const { name, email, password } = req.body;

    // if (!email || !password || !email.includes('@') || password.trim().length < 7) {
    //     res.status(422).json({ message: "Invalid email or password" });
    //     return;
    // }
    const mongoClient = await connectToDatabase();
    const db = mongoClient.db(process.env.mongodbDatabase);
    const collection = db.collection(process.env.mongodbUsersCollection);

    const existingUser = await collection.findOne({ email: email });

    if (existingUser) {
        res.status(422).json({ message: "User already exists!" });
        return;
    }

    const hashedPassword = await hashPassword(password);

    // Create a new Date object for the current date and time
    const currentDate = new Date();
    // Get the day, month, and year
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
    const year = currentDate.getFullYear();
    // Format the date as a string
    const formattedDate = `${month}/${day}/${year}`;

    const userDoc = {
        type: 'credentials',
        created: formattedDate,
        name: name,
        email: email,
        password: hashedPassword,
        items: []
    };
    const result = await collection.insertOne(userDoc);
    mongoClient.close();
    res.status(201).json({ message: "User added successfully!", result: result });
}

export default signUpHandler;