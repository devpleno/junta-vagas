const { insertOne, find } = require("./db.js")

const insertJobs = async (jobs) => {
    return Promise.all(
        jobs.map((current) => {
            return insertOne("jobs", {
                title: current.title,
                workMode: current.workMode,
                company: current.company,
                link: current.link,
                technologies: current.technologies,
                postedAt: current.postedAt,
                platform: current.platform || null,
                logo: current.logo || null
            })
        })
    )
}

const getJobsByCondition = async (condition) => {
    return await find("jobs", { ...condition });
}

module.exports = { insertJobs, getJobsByCondition }