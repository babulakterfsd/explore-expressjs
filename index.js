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

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(verifyJWT);
app.use('/api/v1/sendemail', mailRoute);
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/getaccesstoken', accessTokenRoute);
app.use('/api/v1/create-payment-intent', paymentIntentRoute);
app.use('/api/v1/packages', packagesRoute);
app.use('/api/v1/orders', orderRoute);
app.use('/api/v1/reviews', reviewRoute);

app.get('/', (req, res) => {
    res.send('Running tourguru Server...');
});

app.all('*', (req, res) => {
    res.status(404).send('404! Not Found!!');
});

app.listen(port, () => {
    console.log('Listening to tourguru server on', port);
});
