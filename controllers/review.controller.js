const { ObjectId } = require('mongodb').ObjectId;

module.exports.getAllReviews = async (req, res) => {
    // const cursor = reviewCollection.find({});
    // const reviews = await cursor.toArray();
    // res.send(reviews);
    res.send('getting all reviews');
};

module.exports.addReview = async (req, res) => {
    const { email } = req.params;
    // const decodedEmail = req?.decoded?.userEmail;
    // if (decodedEmail === email) {
    //   const review = req.body;
    //   const result = await reviewCollection.insertOne(review);
    //   res.json(result);
    // }
    res.send(`Review added successfully for ${email}`);
};

module.exports.deleteReview = async (req, res) => {
    const { id } = req.params;
    // const query = { _id: ObjectId(id) };
    // const result = await reviewCollection.deleteOne(query);
    // res.json(result);
    res.send(`Review with id ${id} deleted successfully`);
};
