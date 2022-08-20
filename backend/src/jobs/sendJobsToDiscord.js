const { getJobsByCondition } = require("./../services/job.js");
const { sendMessage } = require("../utils/discord.js");

module.exports = async () => {
    console.log("Starting getting jobs");
    const initialISODate = new Date(
      new Date().setHours(-3, 0, 0, 0),
    ).toISOString();
    const finalISODate = new Date(
      new Date().setHours(20, 59, 59, 0),
    ).toISOString();

    const condition = {
      $and: [
        { postedAt: { $gte: initialISODate } },
        { postedAt: { $lte: finalISODate } },
      ],
    };

    const jobs = await getJobsByCondition(condition);
    console.log("Finished getting jobs");

    if (jobs.length === 0) {
      console.log("Finished sending jobs to discord");
      return;
    }

    let content = "";
    const maxCaracters = 2000;

    for (let job of jobs) {
      let contentSize = content.length;

      let newContent = ""
      newContent += `Titulo: ${job.title}\n`;
      newContent += `Empresa: ${job.company || "Não foi definida"}\n`;
      newContent += `Localização: ${job.location || "Não foi definida"}\n`;
      newContent += `Tecnologias: ${
        job.technologies?.join(", ") || "Não foram definidas"
      }\n`;
      newContent += `Link: ${job.link}\n\n\n`;

      if (contentSize >= maxCaracters) {
        await sendMessage(content)
        content = ""
      } else if ((contentSize + newContent.length) > maxCaracters) {
        await sendMessage(content)
        content = newContent
      } else {
        content += newContent;
      }

    }

    if (content.length > 0) {
      await sendMessage(content)
    }

    console.log("Finished sending jobs to discord");
};
