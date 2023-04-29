/* eslint-disable no-plusplus */
let totalWebsiteView = 0;
let packageViewCount = 0;

module.exports.totalWebsiteViewCount = (req, res, next) => {
    totalWebsiteView++;
    console.log('Total Website visits:', totalWebsiteView);
    next();
};
module.exports.packageViewCount = (req, res, next) => {
    packageViewCount++;
    console.log('Package View Count:', packageViewCount);
    next();
};
