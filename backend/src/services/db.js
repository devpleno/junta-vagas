const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.DB_URL);

async function connect() {
  await client.connect();
}

async function insertOne(collectionName, doc) {
  const db = client.db(process.env.DB_NAME);
  const collection = db.collection(collectionName);
  const result = await collection.insertOne(doc);
  return result;
}

async function findOne(collectionName, info) {
  const db = client.db(process.env.DB_NAME);
  const collection = db.collection(collectionName);
  const result = await collection.findOne({ ...info });
  return result;
}

async function updateOne(collectionName, searchFor, updateTo) {
  const db = client.db(process.env.DB_NAME);
  const collection = db.collection(collectionName);
  const result = await collection.updateOne(
    { ...searchFor },
    {
      $set: { ...updateTo },
    },
  );
  return result;
}

async function find(collectionName, info) {
  const db = client.db(process.env.DB_NAME);
  const collection = db.collection(collectionName);
  const result = await collection.find({ ...info }).toArray();
  return result;
}

module.exports = { client, connect, insertOne, findOne, updateOne, find };
