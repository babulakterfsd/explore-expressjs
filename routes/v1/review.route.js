const express = require('express');

const router = express.Router();
const {ObjectId} = require("mongodb");

// getting all reviews
router.route('/')
 .get(async (req, res) => {
    // const cursor = reviewCollection.find({});
    // const reviews = await cursor.toArray();
    // res.send(reviews);
    res.send('getting all reviews');
  })

  // add a review
  router.route('/addreview/:email')
    .post(async (req, res) => {
        const {email} = req.params;
        // const decodedEmail = req?.decoded?.userEmail;
        // if (decodedEmail === email) {
        //   const review = req.body;
        //   const result = await reviewCollection.insertOne(review);
        //   res.json(result);
        // }
        res.send(`Review added successfully for ${email}`)
      })

    // delete a single review
    router.route('/:id')
     .delete(async (req, res) => {
        const {id} = req.params;
        // const query = { _id: ObjectId(id) };
        // const result = await reviewCollection.deleteOne(query);
        // res.json(result);
        res.send(`Review with id ${id} deleted successfully`);
      })

module.exports = router;