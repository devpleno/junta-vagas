const axios = require("axios")

async function getJobs() {
  let response = await axios.get("https://startec-candidate-api-production.up.railway.app/jobs")
  let vagas = response.data;
  const todayDate = new Date();
  todayDate.setHours(0)
  todayDate.setMinutes(0)
  todayDate.setSeconds(0)

  var job = vagas.data.filter(job => {
    return new Date(job.created_at).getTime() >= todayDate.getTime() 
  }).map((job) => {

    const skills = job.skills.map(skill => {
      return skill.name
    })

    return {
      title: job.name,
      company: job.company.name,
      locate: job.model,
      requirements: skills,
      postedAt: job.createdAt,
      logo: job.company.avatarSrc,
      link: `https://startecjobs.com/jobs/${job.id}`
    }
  })

  return job;
}

module.exports = getJobs