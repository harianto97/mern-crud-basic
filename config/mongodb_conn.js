const { MongoClient } = require('mongodb');

// const dbName = 'eduwork-mongodb';
// const url = 'mongodb://user1:pwduser1@localhost:27017?authSource=admin';
// const client = new MongoClient(url);

// (async () => {
//   try {
//     await client.connect();
//     console.log('Koneksi ke MongoDB berhasil');
//   } catch (err) {
//     console.log(err);
//   }
// })();

// const db = client.db(dbName);

module.exports = db;
