const { ObjectId } = require('mongodb');
const connectDB = require('../utils/dbConnect');

module.exports.getAllUsers = async (req, res) => {
    const database = await connectDB();
    const userCollection = database.collection('users');
    if (req.query.name) {
        const { name } = req.query;
        const filter = { displayName: { $regex: name, $options: 'i' } };
        const result = await userCollection.find(filter).toArray();
        if (result.length === 0) {
            // return res
            //   .status(404)
            //   .json({ status: "false", message: "No User Found" });
            return res.json([]);
        }
        return res.status(200).json(result);
    }
    const cursor = userCollection.find({});
    const allUser = await cursor.toArray();
    res.json(allUser);
};

module.exports.updateAnUser = async (req, res) => {
    const database = await connectDB();
    const userCollection = database.collection('users');
    const userData = req.body;
    const filter = { email: userData.email };
    const options = { upsert: true };
    const updatedUser = {
        $set: { ...userData },
    };
    const result = await userCollection.updateOne(filter, updatedUser, options);
    res.json(result);
};

module.exports.checkAdminRole = async (req, res) => {
    const database = await connectDB();
    const userCollection = database.collection('users');
    const { email } = req.params;
    const query = { email };
    const user = await userCollection.findOne(query);
    let isAdmin = false;
    if (user?.role === 'admin') {
        isAdmin = true;
    }
    res.json({ admin: isAdmin });
};

module.exports.updateUserToAdmin = async (req, res) => {
    const database = await connectDB();
    const userCollection = database.collection('users');
    const { id } = req.params;
    const filter = { _id: ObjectId(id) };
    const options = { upsert: true };
    const roleUpdate = {
        $set: {
            role: 'admin',
        },
    };
    const result = await userCollection.updateOne(filter, roleUpdate, options);
    res.json(result);
};

module.exports.getSingleUserDetails = async (req, res) => {
    const database = await connectDB();
    const userCollection = database.collection('users');
    const decodedEmail = req?.decoded?.userEmail;
    const { email } = req.params;
    if (decodedEmail === email) {
        const query = { email };
        const user = await userCollection.findOne(query);
        res.send(user);
    }
};

module.exports.updateSingleUserInfo = async (req, res) => {
    const database = await connectDB();
    const userCollection = database.collection('users');
    const { email } = req.params;
    const query = { email };
    const user = await userCollection.findOne(query);
    const options = { upsert: true };
    const infoUpdate = {
        $set: {
            ...req.body,
        },
    };
    const result = await userCollection.updateOne(user, infoUpdate, options);
    res.json(result);
};

module.exports.deleteSingleUser = async (req, res) => {
    const database = await connectDB();
    const userCollection = database.collection('users');
    const { id } = req.params;
    const query = { _id: ObjectId(id) };
    const result = await userCollection.deleteOne(query);
    res.json(result);
};
