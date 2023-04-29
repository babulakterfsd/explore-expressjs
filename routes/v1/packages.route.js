const express = require('express');

const router = express.Router();
const packageController = require('../../controllers/packages.controller');
const { packageViewCount } = require('../../middlewares/viewCount');

router
    .route('/')
    .get(packageViewCount, packageController.getAllPackages) // packageViewCount is a middleware which tracks the number of times the packages route is visited. This is the way to use a middleware in a route.

    // add a new package
    .post(packageController.addANewPackage);

// get and delete a single package
router
    .route('/:packageid')
    .get(packageViewCount, packageController.getASinglePackage)
    .delete(packageController.deleteAPackage);

module.exports = router;
