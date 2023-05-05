const { MongoClient } = require('mongodb');

let db;

async function connectDB() {
    if (db) return db;

    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ooo4k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();
    db = client.db('tourguru');
    return db;
}

module.exports = connectDB;
