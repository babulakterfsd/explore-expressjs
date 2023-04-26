const express = require('express');
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;

router.route('/')
  .get(async (req, res) => {
    // if (req.query.location) {
    //   const location = req.query.location;
    //   const filter = { "location.city": { $regex: location, $options: "i" } };
    //   const result = await packageCollection.find(filter).toArray();
    //   if (result.length === 0) {
    //     // return res
    //     //   .status(404)
    //     //   .json({ status: "false", message: "No Package Found" });
    //     return res.json([]);
    //   }
    //   return res.status(200).json(result);
    // } else {
    //   const limit = +req.query.limit;
    //   let result;
    //   if (limit) {
    //     result = await packageCollection
    //       .find({})
    //       .sort({ _id: -1 })
    //       .limit(limit)
    //       .toArray();
    //   } else {
    //     result = await packageCollection.find({}).sort({ _id: -1 }).toArray();
    //   }
    //   res.json(result);
    // }
    res.send('getting all packages');
  })
  //add a new package
  .post(async (req, res) => {
    const newPackage = req.body;
    // const result = await packageCollection.insertOne(newPackage);
    res.json(newPackage);
  })


  // get and delete a single package
  router.route('/:packageid')
   .get(async (req, res) => {
    const packageid = req.params.packageid;
    // const query = { _id: ObjectId(packageid) };
    // const package = await packageCollection.findOne(query);
    // res.send(package);
    res.send(`getting package with id ${packageid}`);
  })
  .delete(async (req, res) => {
    const id = req.params.packageid;
    // const query = { _id: ObjectId(id) };
    // const result = await packageCollection.deleteOne(query);
    // res.json(result);
    res.send(`Package with id ${id} deleted successfully`);
  })

  module.exports = router;