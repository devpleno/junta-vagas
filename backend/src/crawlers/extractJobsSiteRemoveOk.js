const axios = require("axios")
const cheerio = require("cheerio")
const URL = "https://remoteok.com/"

const isJobPostedToday = (jobsDate) => {
    const postedAt = new Date(jobsDate)

    const dateInitial = new Date()
    dateInitial.setUTCMinutes(0)
    dateInitial.setUTCHours(0)
    dateInitial.setUTCSeconds(0)

    const dateFinal = new Date();
    dateFinal.setUTCMinutes(59)
    dateFinal.setUTCHours(23)
    dateFinal.setUTCSeconds(59)

    return (postedAt >= dateInitial && postedAt <= dateFinal)
}

const extractJobs = (html) => {
    const $ = cheerio.load(html);
    const jobs = [];
    $("#jobsboard > tbody > tr.job").toArray().forEach(tr => {
        const job = {}
        job.title = $(tr).attr("data-search")
        job.company = $(tr).attr("data-company")
        job.link = "https://remoteok.com" + $(tr).attr("data-url")
        job.logo = $(tr).find("img:nth-child(1)").attr("data-src")
        job.postedAt = $(tr).find("td > a > time").attr("datetime")
        job.locale = $(tr).find(".location.tooltip").text()

        const labels = []
        $(tr).find("td.tags > a").toArray().forEach(tag => {
            const label = $(tag).find("div > h3").text()
            labels.push(label)
        })

        job.requirements = labels
        job.platform = "remoteok.io";
        if (isJobPostedToday(job.postedAt)) {
            jobs.push(job)
        }
    })

    return jobs
}

module.exports = async () => {
    const response = await axios.get(URL, {
        headers: {
            "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36"
        }
    })
    const html = response.data;
    return extractJobs(html)
}