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

    const sleep = (seconds) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), seconds * 1000);
      });
    };

    const sendMessage = async (content) => {
      try {
        await sleep(3);

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
      } catch (e) {
        console.log(e);
      }
    };

    let content = "";
    let counter = 0;
    const requests = [];

    const jobsSize = jobs.length;
    const limit = jobsSize % 2 === 0 ? 2 : 1;
    const maxCaracters = 2000;

    for (let job of jobs) {
      let contentSize = content.length;
      let canSend = counter === limit && contentSize <= maxCaracters;

      if (canSend) {
        requests.push(sendMessage(content));
        content = "";
        counter = 0;
      }

      content += `Titulo: ${job.title}\n`;
      content += `Empresa: ${job.company || "Não foi definida"}\n`;
      content += `Localização: ${job.location || "Não foi definida"}\n`;
      content += `Tecnologias: ${
        job.technologies?.join(", ") || "Não foram definidas"
      }\n`;
      content += `Link: ${job.link}\n\n\n`;

      counter++;
    }

    await Promise.all(requests);
    console.log("Finished sending jobs to discord");
  } catch (error) {
    console.log(error);
  }
};
