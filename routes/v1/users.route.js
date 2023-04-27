const express = require('express');

const router = express.Router();
const usersController = require('../../controllers/users.controller');

// get all users and update an user
router.route('/').get(usersController.getAllUsers).put(usersController.updateAnUser);

// check admin role
router.route('/checkadminrole/:email').get(usersController.checkAdminRole);

// update user to admin
router.route('/updateusertoadmin/:id').put(usersController.updateUserToAdmin);

// get single user details
router.route('/getuserdetails/:email').get(usersController.getSingleUserDetails);

// single user
router.route('/:email').put(usersController.updateSingleUserInfo);

// delete a single user
router.route('/:id').delete(usersController.deleteSingleUser);

module.exports = router;

// get user by email filter with query params
// app.get("/finduserbyemail", async (req, res) => {
//   const {email} = req.query;
//   const search = email.toLocaleLowerCase();
//   const matched = await userCollection.findOne({email: search});
//   res.send(matched);
// });
