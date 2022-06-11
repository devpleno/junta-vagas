const extractJobsSitesBackendBr = require("../crawlers/extractJobsSiteBackendbr")
const extractJobsSiteFrontendBr = require("../crawlers/extractJobsSiteFrontendbr");
const extractJobsSiteRemoveOk = require("../crawlers/extractJobsSiteRemoveOk")
const { insertJobs } = require("../services/job")

module.exports = async () => {
  console.log("Init extraction the jobs")
  const results = await Promise.all([
    extractJobsSiteFrontendBr(),
    extractJobsSiteRemoveOk(),
    extractJobsSitesBackendBr()
  ])
  const jobs = [...results[0], ...results[1], ...results[2]]
  console.log("Init insertation the jobs extracted in database")
  await insertJobs(jobs)
  console.log("Inserted jobs extracted in database with success")
}

