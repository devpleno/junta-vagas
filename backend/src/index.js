const express = require("express");
const app = express();

const { connect: connectWithDB } = require("../src/services/db");

const remoteOkCrawler = require("./removeOkCrawler");

const newsletterRouter = require("./routes/newsletter");

remoteOkCrawler().then(console.log);

// Middleware responsable per parse data to json
app.use(express.json());

app.use("/newsletter", newsletterRouter);

connectWithDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running address: http://localhost:3000");
    });
  })
  .catch((err) => console.error(err));
