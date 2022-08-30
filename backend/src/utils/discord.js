const axios = require("axios");
const { sleep } = require("./sleeper");

const sendMessage = async (content) => {
    await sleep(2);

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

    await axios(config);
};

module.exports = {
    sendMessage
}