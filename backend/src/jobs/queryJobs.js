const getJobsToday = require("../services/getJobsToday")

module.exports = {
  queryData: async (connectionDB) => {
    const db = connectionDB.db(process.env.DB_NAME)
    const collection = db.collection("jobs")
    return getJobsToday(collection)
  }
}