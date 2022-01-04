const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const jobs_backendbr = require('./extract_jobs_site_backendbr')

const insertJobs = async (coll) => {
  const jobs = await jobs_backendbr()
  try {
    await Promise.all(
      jobs.map((curr) => {
        return coll.insertOne({
          title: curr.title,
          workMode: curr.workMode,
          company: curr.company,
          link: curr.link,
          technologies: curr.technologies,
          postedAt: curr.postedAt,
          platform: 'Backend-BR',
          logo: 'logo'
        })
      }))
    console.log('Itens inseridos com sucesso')
  } catch (err) {
    console.log(err)
  }
}

const connectDb = new Promise((resolve, reject) => {
  MongoClient.connect('mongodb://localhost:27017/jobs', (err, client) => {
    if (err) {
      return reject(err)
    }
    const db = client.db('junta-vagas')
    resolve({ db: db, client: client })
  })
})

module.exports = {
  insertData: () => {
    connectDb.then(insertData = async data => {
      const jobsCollection = data.db.collection('jobs')
      await insertJobs(jobsCollection)
      data.client.close()
    })
  }
}
