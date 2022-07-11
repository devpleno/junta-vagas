const { connect, client: connectionDB, findOne } = require("../services/db")

const queryData = async coll => {
  const cursorEmail = await coll.find(
    {
      "status": true
    }).toArray()

  return cursorEmail
}

module.exports = {
  queryData: async (connectionDB) => {
    const db = connectionDB.db(process.env.DB_NAME)
    const collection = db.collection("newsletters")
    return queryData(collection)
  }
}