require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const allowedCorsDomains = process.env.CORS_DOMAINS || "";
const whitelist = allowedCorsDomains.split(",").map(item => item.trim());

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    }else{
      callback(new Error("Not allowed by CORS")) ;  
    }
  },
  credentials: true,
}
app.use(cors(corsOptions));

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
    client.close();
  });
