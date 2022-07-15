const getEmailsConfirmed = require("../services/newsletter")

module.exports = {
  queryData: async (connectionDB) => {
    const db = connectionDB.db(process.env.DB_NAME)
    const collection = db.collection("newsletters")
    return getEmailsConfirmed(collection)
  }
}