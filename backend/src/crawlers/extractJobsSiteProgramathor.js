const axios = require("axios");
const cheerio = require("cheerio");

const extractJobs = (html) => {
  const jobs = [];
  const $ = cheerio.load(html);

  $(".cell-list > *")
    .toArray()
    .forEach((item) => {
      const titleEl = $(item).find("div.cell-list-content h3");

      if ($(titleEl).has("span")) {
        $(titleEl).find("span").remove();
      }

      const title = $(titleEl).text();
      const workMode = $(item)
        .find("div.cell-list-content-icon span:nth-child(2)")
        .text();
      const link =
        "https://programathor.com.br" + $(item).filter("a").attr("href");
      let company = $(item)
        .find("div.cell-list-content-icon span:nth-child(1)")
        .text();

      if (!company || company.length == 0) {
        company = "Companhia não informada";
      }

      let labels = [];
      $(item)
        .find("div span.tag-list")
        .toArray()
        .forEach((label) => {
          labels.push($(label).text().replace(/[\n]/g, "").trim());
        });

      const postedAt = $(item).find("relative-time").attr("datetime") || "";

      const logo = $(item).find(".cell-logo .logo-list img").attr("src");

      if (title) {
        jobs.push({
          title,
          company,
          locale: workMode,
          requirements: labels,
          postedAt,
          platform: "programathor",
          logo,
          link,
        });
      }
    });

  return jobs;
};

const url = "https://programathor.com.br/jobs";

module.exports = async () => {
  let response = await axios.get(url);
  let html = response.data;
  let jobs = extractJobs(html);
  return jobs;
};
