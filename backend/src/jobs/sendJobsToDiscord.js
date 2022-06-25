const { getJobsByCondition } = require("./../services/job.js");
const axios = require("axios");

module.exports = async () => {
  try {
    console.log("Starting getting jobs");
    const initialISODate = new Date(
      new Date().setHours(-3, 0, 0, 0),
    ).toISOString();
    const finalISODate = new Date(
      new Date().setHours(20, 59, 59, 0),
    ).toISOString();

    const condition = {
      $and: [
        { postedAt: { $gte: new Date(initialISODate) } },
        { postedAt: { $lte: new Date(finalISODate) } },
      ],
    };

    const jobs = await getJobsByCondition(condition);
    console.log("Finished getting jobs");

    if (jobs.length === 0) {
      console.log("Finished sending jobs to discord");
      return;
    }

    let content = "";
    jobs.forEach((job) => {
      content += `Vaga postada em ${job.postedAt.toLocaleDateString()} na plataforma ${
        job.platform
      }\n`;
      content += `Titulo: ${job.title}\n`;
      content += `Empresa: ${job.company}\n`;
      content += `Localização: ${job.location}\n`;
      content += `Tecnologias: ${job.technologies?.join(", ")}\n`;
      content += `Link: ${job.link}\n\n\n`;
    });

    const params = {
      username: process.env.USERNAME_DISCORD,
      content,
    };

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(params),
      url: process.env.URL_WEBHOOK_DISCORD,
    };

    await axios.post(config);
    console.log("Finished sending jobs to discord");
  } catch (error) {
    console.log(error);
  }
};
