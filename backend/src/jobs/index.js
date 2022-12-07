// Load .env
require("dotenv").config();
const { connect } = require("../services/db");
const schedule = require('node-schedule')
const insertJobsExtractedInDb = require("./insertJobsExtractedInDb")
const sendJobsToDiscord = require("./sendJobsToDiscord");
const { sendJobsTodayByEmail } = require("./sendJobsTodayByEmail.js")
const Sentry = require("../configs/Sentry")

const rule = new schedule.RecurrenceRule()
rule.hour = 23
rule.minute = 30
rule.tz = 'America/Sao_Paulo'

connect()
    .then(async () => {
        schedule.scheduleJob(rule, async () => {
            try {
                await insertJobsExtractedInDb()
                await sendJobsToDiscord();
                await sendJobsTodayByEmail()  
            } catch (err) {
                console.log(err)
                Sentry.captureException(err)  
            }
        })
        
        console.log(">>>>>>>>>> CRONJOBS STARTED <<<<<<<<<<<<<<")
    })
