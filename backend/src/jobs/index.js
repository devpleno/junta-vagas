// Load .env
require("dotenv").config();
const { connect } = require("../services/db");
const schedule = require('node-schedule')
const insertJobsExtractedInDb = require("./insertJobsExtractedInDb")
const sendJobsToDiscord = require("./sendJobsToDiscord");

const rule = new schedule.RecurrenceRule()
rule.hour = 23
rule.minute = 30
rule.tz = 'America/Sao_Paulo'

connect()
    .then(() => {
        schedule.scheduleJob(rule, async () => {
            try {
                await insertJobsExtractedInDb()
                await sendJobsToDiscord();
            } catch (err) {
                console.log(err)
            }
        })
    })




