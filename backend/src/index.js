require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const Sentry = require("./configs/Sentry")

app.use(cors('*'));

const { connect: connectWithDB, client } = require("../src/services/db");

const newsletterRouter = require("./routes/newsletter");
const jobsRouter = require("./routes/jobs");

// Middleware responsable per parse data to json
app.use(express.json());

app.use("/newsletter", newsletterRouter);
app.use("/jobs", jobsRouter);

connectWithDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running address: http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error(err)
    Sentry.captureException(err)
    client.close();
  });