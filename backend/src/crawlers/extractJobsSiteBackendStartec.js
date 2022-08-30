const axios = require("axios")

async function getJobs() {
  let response = await axios.get("https://startec-api-production.up.railway.app/v2/jobs/list/all")
  let vagas = response.data;

  var job = vagas.jobs.map((job) => {

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
}
return getJobs