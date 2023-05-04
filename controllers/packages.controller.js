const { ObjectId } = require('mongodb');
const connectDB = require('../utils/dbConnect');

/* we can say every controller is a middleware. It also gets the next parameter */

module.exports.getAllPackages = async (req, res, next) => {
    try {
        const database = await connectDB();
        const packageCollection = database.collection('tourpackages');
        if (req.query.location) {
            const { location } = req.query;
            const filter = { 'location.city': { $regex: location, $options: 'i' } };
            const result = await packageCollection.find(filter).toArray();
            if (result.length === 0) {
                // return res
                //   .status(404)
                //   .json({ status: "false", message: "No Package Found" });
                return res.json([]);
            }
            return res.status(200).json(result);
        }
        const limit = +req.query.limit;
        let result;
        if (limit) {
            result = await packageCollection.find({}).sort({ _id: -1 }).limit(limit).toArray();
        } else {
            result = await packageCollection.find({}).sort({ _id: -1 }).toArray();
        }
        res.json(result);
    } catch (error) {
        // res.status(500).json({ error: 'Something went wrong' });
        next(error); // This will be caught by the error handler middleware, this process is followed in production level code
    }
};

module.exports.addANewPackage = async (req, res, next) => {
    try {
        const database = await connectDB();
        const packageCollection = database.collection('tourpackages');
        const newPackage = req.body;
        const result = await packageCollection.insertOne(newPackage);
        res.json(newPackage);
    } catch (error) {
        // res.status(500).json({ error: 'Something went wrong' });
        next(error); // This will be caught by the error handler middleware, this process is followed in production level code
    }
};

module.exports.getASinglePackage = async (req, res, next) => {
    try {
        const database = await connectDB();
        const packageCollection = database.collection('tourpackages');
        const { packageid } = req.params;
        if (!ObjectId.isValid(packageid)) {
            return res.status(400).json({ error: 'Invalid package id' });
        }
        const query = { _id: ObjectId(packageid) };
        const pack = await packageCollection.findOne(query);
        if (!pack) {
            return res.status(404).json({ error: 'Package not found' });
        }
        res.send(pack);
    } catch (error) {
        // res.status(500).json({ error: 'Something went wrong' });
        next(error); // This will be caught by the error handler middleware, this process is followed in production level code
    }
};

module.exports.deleteAPackage = async (req, res, next) => {
    try {
        const database = await connectDB();
        const packageCollection = database.collection('tourpackages');
        const id = req.params.packageid;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid package id' });
        }
        const query = { _id: ObjectId(id) };
        const result = await packageCollection.deleteOne(query);
        res.json(result);
    } catch (error) {
        // res.status(500).json({ error: 'Something went wrong' });
        next(error); // This will be caught by the error handler middleware, this process is followed in production level code
    }
};
