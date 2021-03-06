require("dotenv").config();
const express = require("express");
const app = express();

const { connect: connectWithDB, client } = require("../src/services/db");

const newsletterRouter = require("./routes/newsletter");

// Middleware responsable per parse data to json
app.use(express.json());

app.use("/newsletter", newsletterRouter);

connectWithDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running address: http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error(err)
    client.close();
  });
