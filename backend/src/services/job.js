const { insertOne, client } = require("./db")

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

const findJobsToday = async () => {

    const getToday = () => {
        const today = new Date()
        return today.getFullYear() + '-' + 0 + (today.getMonth() + 1) + '-' + today.getDate()
    }

    const dateFilterJobs = getToday()

    const db = client.db(process.env.DB_NAME)
    const coll = db.collection("jobs")
    const result = await coll.find({
        "postedAt":
            { $gte: `${dateFilterJobs} 00:00:00` }
    }).toArray()

    return result

}

module.exports = { insertJobs, findJobsToday }