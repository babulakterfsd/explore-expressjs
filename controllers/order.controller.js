const { ObjectId } = require('mongodb');
const connectDB = require('../utils/dbConnect');

/* we can say every controller is a middleware. It also gets the next parameter */

module.exports.getAllOrders = async (req, res, next) => {
    try {
        const database = await connectDB();
        const orderCollection = database.collection('orders');
        const cursor = orderCollection.find({});
        const services = await cursor.toArray();
        res.json(services);
    } catch (error) {
        next(error); // This will be caught by the error handler middleware, this process is followed in production level code
    }
};

module.exports.getSpecificUserOrders = async (req, res, next) => {
    try {
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
        } else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (error) {
        next(error);
    }
};

module.exports.updateAnOrderStatus = async (req, res, next) => {
    try {
        const database = await connectDB();
        const orderCollection = database.collection('orders');
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid order id' });
        }
        const filter = { _id: ObjectId(id) };
        const options = { upsert: true };
        const packageUpdate = {
            $set: {
                status: 'approved',
            },
        };
        const result = await orderCollection.updateOne(filter, packageUpdate, options);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

module.exports.deleteAnOrder = async (req, res, next) => {
    try {
        const database = await connectDB();
        const orderCollection = database.collection('orders');
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid order id' });
        }
        const query = { _id: ObjectId(id) };
        const result = await orderCollection.deleteOne(query);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

module.exports.placeOrder = async (req, res, next) => {
    try {
        const database = await connectDB();
        const orderCollection = database.collection('orders');
        const orderedPackage = req.body;
        const result = await orderCollection.insertOne(orderedPackage);
        res.json(result);
    } catch (error) {
        next(error);
    }
};
