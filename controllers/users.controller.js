module.exports.getAllUsers = async (req, res) => {
    // if (req.query.name) {
    //   const name = req.query.name;
    //   const filter = { displayName: { $regex: name, $options: "i" } };
    //   const result = await userCollection.find(filter).toArray();
    //   if (result.length === 0) {
    //     // return res
    //     //   .status(404)
    //     //   .json({ status: "false", message: "No User Found" });
    //     return res.json([]);
    //   }
    //   return res.status(200).json(result);
    // } else {
    //   const cursor = userCollection.find({});
    //   const allUser = await cursor.toArray();
    //   res.json(allUser);
    // }
    res.send('getting all users');
};

module.exports.updateAnUser = async (req, res) => {
    // const userData = req.body;
    //   const filter = { email: userData.email };
    //   const options = { upsert: true };
    //   const updatedUser = {
    //     $set: { ...userData },
    //   };
    //   const result = await userCollection.updateOne(
    //     filter,
    //     updatedUser,
    //     options
    //   );
    //   res.json(result);
    res.send('updating user');
};

module.exports.checkAdminRole = async (req, res) => {
    const { email } = req.params;
    // const query = { email: email };
    // const user = await userCollection.findOne(query);
    // let isAdmin = false;
    // if (user?.role === "admin") {
    //   isAdmin = true;
    // }
    // res.json({ admin: isAdmin });
    res.send(`Checking admin role for ${email}`);
};

module.exports.updateUserToAdmin = async (req, res) => {
    const { id } = req.params;
    // const filter = { _id: ObjectId(id) };
    // const options = { upsert: true };
    // const roleUpdate = {
    //   $set: {
    //     role: "admin",
    //   },
    // };
    // const result = await userCollection.updateOne(
    //   filter,
    //   roleUpdate,
    //   options
    // );
    // res.json(result);
    res.send(`User ${id} has been updated to admin`);
};

module.exports.getSingleUserDetails = async (req, res) => {
    // const decodedEmail = req?.decoded?.userEmail;
    // const email = req.params.email;
    // if (decodedEmail === email) {
    //   const query = { email: email };
    //   const user = await userCollection.findOne(query);
    //   res.send(user);
    // }
    res.send(`Getting user details`);
};

module.exports.updateSingleUserInfo = async (req, res) => {
    const { email } = req.params;
    // const query = { email: email };
    // const user = await userCollection.findOne(query);
    // const options = { upsert: true };
    // const infoUpdate = {
    //   $set: {
    //     ...req.body,
    //   },
    // };
    // const result = await userCollection.updateOne(user, infoUpdate, options);
    // res.json(result);
    res.send(`User ${email} has been updated`);
};

module.exports.deleteSingleUser = async (req, res) => {
    const { id } = req.params;
    // const query = { _id: ObjectId(id) };
    // const result = await reviewCollection.deleteOne(query);
    // res.json(result);
    res.send(`User ${id} has been deleted`);
};
