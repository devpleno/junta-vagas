const axios = require("axios")

async function getJobs() {
  let response = await axios.get("https://startec-api-production.up.railway.app/v2/jobs/list/all")
  let vagas = response.data;
  const todayDate = new Date();
  todayDate.setHours(0)
  todayDate.setMinutes(0)
  todayDate.setSeconds(0)

  var job = vagas.jobs.filter(job => {
    return new Date(job.created_at).getTime() >= todayDate.getTime() 
  }).map((job) => {

    const skills = job.jobSkills.map(skill => {
      return skill.name
    })

    return {
      title: job.title,
      company: job.companyName,
      locate: job.workModel,
      requirements: skills,
      postedAt: job.created_at,
      logo: job.companyLogo
    }
  })

  return job;
}

module.exports = getJobs