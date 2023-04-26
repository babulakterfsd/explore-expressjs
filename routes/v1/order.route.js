const express = require('express');

const router = express.Router();
const { ObjectId } = require('mongodb');

// get all orders
router.route('/').get(async (req, res) => {
    // if (req.query.email) {
    //   const email = req.query.email;
    //   const filter = { email: { $regex: email, $options: "i" } };
    //   const result = await orderCollection.find(filter).toArray();
    //   if (result.length === 0) {
    //     // return res
    //     //   .status(404)
    //     //   .json({ status: "false", message: "No Order Avilable from This User" });
    //     return res.json([]);
    //   }
    //   return res.status(200).json(result);
    // } else {
    //   const cursor = orderCollection.find({});
    //   const services = await cursor.toArray();
    //   res.json(services);
    // }
    res.send('getting all orders');
});

// get specific users orders
router.route('/:email').get(async (req, res) => {
    console.log(req?.decoded);
    const decodedEmail = req?.decoded?.email;
    // const email = req.params.email;
    // if (decodedEmail === email) {
    //   const result = await orderCollection
    //     .find({
    //       email: email,
    //     })
    //     .toArray();
    //   res.send(result);
    // }
    res.send(`getting orders for ${decodedEmail}`);
});

router
    .route('/:id')
    // update order status
    .put(async (req, res) => {
        const { id } = req.params;
        // const filter = { _id: ObjectId(id) };
        // const options = { upsert: true };
        // const packageUpdate = {
        //   $set: {
        //     status: "approved",
        //   },
        // };
        // const result = await orderCollection.updateOne(
        //   filter,
        //   packageUpdate,
        //   options
        // );
        // res.json(result);
        res.send(`Order with id ${id} updated successfully`);
    })
    // delete order
    .delete(async (req, res) => {
        const { id } = req.params;
        // const query = { _id: ObjectId(id) };
        // const result = await orderCollection.deleteOne(query);
        // res.json(result);
        res.send(`Order with id ${id} deleted successfully`);
    });

// place an order
router.route('/placeorder').post(async (req, res) => {
    // const orderedPackage = req.body;
    // const result = await orderCollection.insertOne(orderedPackage);
    // res.json(result);
    res.send('Order placed successfully');
});

module.exports = router;
