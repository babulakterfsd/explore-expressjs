const { ObjectId } = require('mongodb');
const connectDB = require('../utils/dbConnect');

module.exports.getAllOrders = async (req, res) => {
    const database = await connectDB();
    const orderCollection = database.collection('orders');
    if (req.query.email) {
        const { email } = req.query;
        const filter = { email: { $regex: email, $options: 'i' } };
        const result = await orderCollection.find(filter).toArray();
        if (result.length === 0) {
            // return res
            //   .status(404)
            //   .json({ status: "false", message: "No Order Avilable from This User" });
            return res.json([]);
        }
        return res.status(200).json(result);
    }
    const cursor = orderCollection.find({});
    const services = await cursor.toArray();
    res.json(services);
};

module.exports.getSpecificUserOrders = async (req, res) => {
    const database = await connectDB();
    const orderCollection = database.collection('orders');
    const decodedEmail = req?.decoded?.email;
    const { email } = req.params;
    if (decodedEmail === email) {
        const result = await orderCollection
            .find({
                email,
            })
            .toArray();
        res.send(result);
    }
};

module.exports.updateAnOrderStatus = async (req, res) => {
    const database = await connectDB();
    const orderCollection = database.collection('orders');
    const { id } = req.params;
    const filter = { _id: ObjectId(id) };
    const options = { upsert: true };
    const packageUpdate = {
        $set: {
            status: 'approved',
        },
    };
    const result = await orderCollection.updateOne(filter, packageUpdate, options);
    res.json(result);
};

module.exports.deleteAnOrder = async (req, res) => {
    const database = await connectDB();
    const orderCollection = database.collection('orders');
    const { id } = req.params;
    const query = { _id: ObjectId(id) };
    const result = await orderCollection.deleteOne(query);
    res.json(result);
};

module.exports.placeOrder = async (req, res) => {
    const database = await connectDB();
    const orderCollection = database.collection('orders');
    const orderedPackage = req.body;
    const result = await orderCollection.insertOne(orderedPackage);
    res.json(result);
};
