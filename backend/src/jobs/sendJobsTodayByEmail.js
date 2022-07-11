const { client } = require("../services/db")
const queryJobs = require('./queryJobs')
const queryEmail = require('./queryEmail')
const email = require('../services/email')

const sendJobsTodayByEmail = async () => {
  const msgFrom = 'teste@gmail.com'
  const subject = 'Vagas do dia'
  const jobs = await queryJobs.queryData(client)
  const emailText = `<style>
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
  const htmlEmail = jobs.map(job => {
    return `<a href=${job.link}>${job.title}</a>`

  }).join("<br/><br/>")

  const message = emailText
    + '<br/><br/>' + htmlEmail

  const msgTo = await queryEmail.queryData(client)

  const emailSendedInfo = msgTo.map(msg => {
    email.sendEmail(
      {
        from: msgFrom,
        to: msg.email,
        subject,
        html: message
      }
    )
  })

  /*const emailSendedInfo = await email.sendEmail( 
    {
      from: msgFrom,
      to: msgTo,
      subject,
      html: message
    })*/
}

module.exports = sendJobsTodayByEmail




