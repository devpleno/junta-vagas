const { paginatingJobs } = require("../services/job");

const getJobsPaginated = async (req, res) => {
        const page = req.query.page || 1;
        const totalItens = req.query.totalItens || 10;
        const result = await paginatingJobs(page, totalItens);
        if (result) {
                res.status(200).json(result);
        } else {
                res.status(500).send({ message: "Error to get jobs" });
        }
}

module.exports = { getJobsPaginated };