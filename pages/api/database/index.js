import fs from "fs/promises";
import path from "path";

export function buildDatabasePath() {
    return path.join(process.cwd(), 'db', 'localDB.json');
}

export async function extractData(filePath) {
    const fileData = await fs.readFile(filePath);
    const data = JSON.parse(fileData);
    return data;
}

async function handler(req, res) {
    if (req.method === 'POST') {
        const name = req.body.name;
        const price = req.body.price;
        const description = req.body.description;
        const imageURL = req.body.imageURL;

        const newItem = {
            id: name,
            name: name,
            price: price,
            description: description,
            imageURL: imageURL
        };
        //store that in a database or in a file
        const filePath = buildDatabasePath();
        const data = await extractData(filePath);
        data.push(newItem);
        console.log(filePath, data);
        await fs.writeFile(filePath, JSON.stringify(data));
        res.status(201).json({ messages: "Success!", item: newItem });
    } else {
        const filePath = buildDatabasePath();
        const data = extractData(filePath);
        res.status(200).json({ feedback: data });
    }
}

export default handler;