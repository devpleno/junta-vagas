const queryJobs = require('./queryJobs')

const jobs = queryJobs.queryData()

console.log(jobs)

/*const htmlEmail = jobs.map(job => {
  return (
    <div>
      <td>${jobs.title}</td>
      <td>${jobs.workMode}</td>
      <td>${jobs.company}</td>
      <td>${jobs.technologies}</td>
      <td>${jobs.postedAt}</td>
    </div>
  )
}).join("")*/