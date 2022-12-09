const dayjs = require("dayjs")
const { insertOne, client, find } = require("./db")

const insertJobs = async (jobs) => {
    return Promise.all(
        jobs.map((current) => {
            return insertOne("jobs", {
                title: current.title,
                workMode: current.workMode,
                company: current.company,
                link: current.link,
                technologies: current.technologies || current.requirements,
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

const getJobsCollection = () => {
    const db = client.db(process.env.DB_NAME);
    const jobsColl = db.collection("jobs");    
    return jobsColl;
}

const findJobsToday = async () => {
    const dateFilterJobs = dayjs().format('YYYY-MM-DD 00:00:00');
    const coll = getJobsCollection();
    const result = await coll.find({
        "postedAt":
            { $gte: dateFilterJobs }
    }).toArray();
    return result;

}

const paginatingJobs = async (pageNum, pageSize) => {
    const coll = await getJobsCollection();
    
    const result = await coll.find({})
                            .sort({postedAt: -1})
                            .skip(pageNum > 0 ? ((pageNum - 1) * pageSize) : 0)
                            .limit(parseInt(pageSize))
                            .toArray();
    return result;
}

module.exports = { insertJobs, findJobsToday, paginatingJobs, getJobsByCondition }
