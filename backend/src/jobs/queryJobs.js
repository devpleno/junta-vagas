const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const dotenv = require('dotenv/config')

const getToday = () => {
  const today = new Date()
  return today.getFullYear() + '-' + 0 + (today.getMonth() + 1) + '-' + today.getDate()
}
const initialHour = 'T00:00:00.000Z'
const finalHour = 'T23:59:59.999Z'

const queryDate = getToday()

const queryJobs = async coll => {
  const cursorJobs = await coll.find(
    {
      "postedAt": {
        $gte: queryDate + initialHour,
        $lte: queryDate + finalHour
      }
    }).toArray()

  cursorJobs.forEach(doc => { console.log(doc) })
  return cursorJobs
}

const connectDb = new Promise((resolve, reject) => {
  const connAdr = 'mongodb://' + process.env.URL
    + ':' + process.env.PORT
    + '/' + process.env.COLLECTION
  MongoClient.connect(connAdr, (err, client) => {
    if (err) {
      return reject(err)
    }
    const db = client.db(process.env.DATABASE)
    resolve({ db: db, client: client })
  })
})

module.exports = {
  queryData: () => {
    connectDb.then(queryData = async data => {
      const jobsDb = data.db.collection(process.env.COLLECTION)
      await queryJobs(jobsDb)
      data.client.close()
    })
  }
}