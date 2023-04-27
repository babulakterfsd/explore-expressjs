const express = require('express');
const { getAccessToken } = require('../../controllers/accessToken.controller');

const router = express.Router();

/*
 * @api {post} /getaccesstoken ---> get access token
 * @apiDescription Get access token
 * @apiPermission every one
 * @apiSuccess {string} access_token  access token
 */
router.route('/').post(getAccessToken);

module.exports = router;
