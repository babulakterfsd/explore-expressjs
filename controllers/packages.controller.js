const { ObjectId } = require('mongodb');
const connectDB = require('../utils/dbConnect');

module.exports.getAllPackages = async (req, res) => {
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
};

module.exports.addANewPackage = async (req, res) => {
    const database = await connectDB();
    const packageCollection = database.collection('tourpackages');
    const newPackage = req.body;
    const result = await packageCollection.insertOne(newPackage);
    res.json(newPackage);
};

module.exports.getASinglePackage = async (req, res) => {
    const database = await connectDB();
    const packageCollection = database.collection('tourpackages');
    const { packageid } = req.params;
    const query = { _id: ObjectId(packageid) };
    const pack = await packageCollection.findOne(query);
    res.send(pack);
};

module.exports.deleteAPackage = async (req, res) => {
    const database = await connectDB();
    const packageCollection = database.collection('tourpackages');
    const id = req.params.packageid;
    const query = { _id: ObjectId(id) };
    const result = await packageCollection.deleteOne(query);
    res.json(result);
};
