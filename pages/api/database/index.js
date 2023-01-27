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
        res.status(201).json({ messages: "Success!", item: newItem });
    }
}

export default handler;