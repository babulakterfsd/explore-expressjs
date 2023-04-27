const express = require('express');

const router = express.Router();
const packageController = require('../../controllers/packages.controller');

router
    .route('/')
    .get(packageController.getAllPackages)
    // add a new package
    .post(packageController.addANewPackage);

// get and delete a single package
router
    .route('/:packageid')
    .get(packageController.getASinglePackage)
    .delete(packageController.deleteAPackage);

module.exports = router;
