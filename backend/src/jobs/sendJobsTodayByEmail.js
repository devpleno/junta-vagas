const { client } = require("../services/db")
const jobsToday = require("../services/job")
const newsletter = require("../services/newsletter")
const email = require("../services/email")

const sendJobsTodayByEmail = async () => {
  const msgFrom = 'teste@gmail.com'
  const subject = 'Vagas do dia'
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
  const linkJobsHtml = jobs.map(job => {
    return `<a href=${job.link}>${job.title}</a>`

  }).join("<br/><br/>")

  const message = emailHtml
    + '<br/><br/>' + linkJobsHtml

  const msgTo = await newsletter.getEmailsConfirmed(client)

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
}

module.exports = { sendJobsTodayByEmail }




