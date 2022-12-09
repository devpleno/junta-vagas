const { client } = require("../services/db")
const jobsToday = require("../services/job")
const newsletter = require("../services/newsletter")
const email = require("../services/email")

const sendJobsTodayByEmail = async () => {
  const msgFrom = process.env.EMAIL_FROM
  const subject = 'Vagas do dia'
  console.log("Getting jobs today")
  const jobs = await jobsToday.findJobsToday(client)
  const emailHtml = `<style>
                     @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap');
                      p {
                        margin-top: 4px;
                        font-family: 'Raleway', sans-serif;
                      }
                      a:hover {
                        color: green;
                      }
                      a:active {
                        color: yellow;
                      }                   
                    </style>
                    <p>Olá!</p><br/>
                    <p>Seguem as vagas do dia que o Junta Vagas separou para você: <p>`

  console.log("Creating email with jobs today")

  if (jobs.length === 0) {
    console.log("Don't have jobs to notify per email")
    return;
  }

  const linkJobsHtml = jobs.map(job => {
    return `<a href=${job.link}>${job.title}</a>`

  }).join("<br/><br/>")

  const message = emailHtml
    + '<br/><br/>' + linkJobsHtml

  console.log("Getting emails confirmed to send jobs today")
  const msgTo = await newsletter.getEmailsConfirmed(client)

  console.log("Sending emails with jobs today to each email confirmed")
  msgTo.map(msg => {
    email.sendEmail(
      {
        from: msgFrom,
        to: msg.email,
        subject,
        html: message
      }
    )
  })

  console.log("Finished process notify jobs today per email")

}

module.exports = { sendJobsTodayByEmail }




