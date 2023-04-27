const { ObjectId } = require('mongodb');
const connectDB = require('../utils/dbConnect');

module.exports.getAllReviews = async (req, res) => {
    const database = await connectDB();
    const reviewCollection = database.collection('reviews');
    const cursor = reviewCollection.find({});
    const reviews = await cursor.toArray();
    res.send(reviews);
};

module.exports.addReview = async (req, res) => {
    const database = await connectDB();
    const reviewCollection = database.collection('reviews');
    const { email } = req.params;
    const decodedEmail = req?.decoded?.userEmail;
    if (decodedEmail === email) {
        const review = req.body;
        const result = await reviewCollection.insertOne(review);
        res.json(result);
    }
};

module.exports.deleteReview = async (req, res) => {
    const database = await connectDB();
    const reviewCollection = database.collection('reviews');
    const { id } = req.params;
    const query = { _id: ObjectId(id) };
    const result = await reviewCollection.deleteOne(query);
    res.json(result);
};
