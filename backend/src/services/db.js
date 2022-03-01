const { MongoClient } = require("mongodb");

const uri = `${process.env.DB_URL}`;

const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();
  } catch (err) {
    await client.close();
  }
}

async function insertOne(collectionName, doc) {
  try {
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(collectionName);

    const result = await collection.insertOne(doc);

    return result;
  } catch (err) {
    await client.close();
  }
}

async function findOne(collectionName, info) {
  try {
    const db = client.db(process.env.DB_NAME);

    const collection = db.collection(collectionName);

    const result = await collection.findOne({ ...info });

    return result;
  } catch (err) {
    await client.close();
  }
}

async function updateOne(collectionName, searchFor, updateTo) {
  try {
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(collectionName);

    const result = await collection.updateOne(
      { ...searchFor },
      {
        $set: { ...updateTo },
      }
    );

    return result;
  } catch (err) {
    await client.close();
  }
}

module.exports = { connect, insertOne, findOne, updateOne };
