const { connect, client: connectionDB, findOne } = require("../services/db")

const getToday = () => {
  const today = new Date()
  return today.getFullYear() + '-' + 0 + (today.getMonth() + 1) + '-' + today.getDate()
}

const queryDate = getToday()

const queryJobs = async coll => {
  const cursorJobs = await coll.find(
    {
      /*"postedAt": {
        $gte: `${queryDate} 00:00:00`
      }*/
    }).toArray()

  //cursorJobs.forEach(doc => { console.log(doc) })
  return cursorJobs
}

module.exports = {
  queryData: async (connectionDB) => {
    const db = connectionDB.db(process.env.DB_NAME)
    const collection = db.collection("jobs")
    return queryJobs(collection)
  }
}