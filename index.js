/*
  5 types of middleware:
    1. Application level middleware
    2. Router level middleware
    3. Error handling middleware
    4. Built-in middleware
    5. Third party middleware
*/

const express = require('express');
const cors = require('cors');
const verifyJWT = require('./middlewares/verifyJWT');
const mailRoute = require('./routes/v1/mail.route');
const usersRoute = require('./routes/v1/users.route');
const packagesRoute = require('./routes/v1/packages.route');
const orderRoute = require('./routes/v1/order.route');
const reviewRoute = require('./routes/v1/review.route');
const accessTokenRoute = require('./routes/v1/accessToken.route');
const paymentIntentRoute = require('./routes/v1/payment.route');
const { totalWebsiteViewCount } = require('./middlewares/viewCount');
const errorHandler = require('./middlewares/errorHandler');
const limiter = require('./middlewares/limitApiCalls');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/storage`)); // serving static files from server
app.set('view engine', 'ejs'); // setting view engine to ejs

app.use(totalWebsiteViewCount); // application level middleware, route level example is in routes\v1\packages.route.js

app.use(limiter); // limits api calls to 1 per minute, a third party middleware
app.use('/api/v1/getaccesstoken', accessTokenRoute);
// app.use(verifyJWT);
app.use('/api/v1/sendemail', mailRoute);
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/create-payment-intent', paymentIntentRoute);
app.use('/api/v1/packages', packagesRoute);
app.use('/api/v1/orders', orderRoute);
app.use('/api/v1/reviews', reviewRoute);

app.get('/', (req, res) => {
    res.send('Running tourguru Server...');
});

/*
no need to use this route as we are serving static files from server using express.static. we can get files from server using the url: http://localhost:5000/awal.jpg . even we can send html too. but convention is to keep html files in views folder and use ejs to render them.

app.get('/getpic', (req, res) => {
    // sending static file from server
    res.sendFile(`${__dirname}/storage/awal.jpg`);
});
*/

app.get('/homepage', (req, res) => {
    // if needed, db can be accessed here. then we can get data from db and send it to ejs file like below
    res.render('home.ejs', {
        five: 5,
        three: 3,
        user: {
            name: 'Awal',
            age: 29,
        },
    });
});

app.all('*', (req, res) => {
    res.status(404).send('404! Not Found!!');
});

app.use(errorHandler); // error handling middleware

app.listen(port, () => {
    console.log('Listening to tourguru server on', port);
});

// if express can't handle the error, then we can use process.on('uncaughtException') to handle the error. but it's not recommended. instead we can use error handling middleware. example is in middlewares\errorHandler.js
process.on('unhandledRejection', (error) => {
    console.log(error.name, error.message);
    app.close(() => {
        process.exit(1);
    });
});
