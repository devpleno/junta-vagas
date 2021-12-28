const express = require("express")
const app = express();

const remoteOkCrawler = require("./removeOkCrawler")

remoteOkCrawler().then(console.log)

// Middleware responsable per parse data to json
app.use(express.json())

app.listen(3000, () => {
    console.log("Server is running address: http://localhost:3000")
})