const { paginatingJobs } = require("../services/job");

const paginatingJobs = async (req, res) => {
    if (req.query.page && req.query.totalItens){
        const {page, totalItens} = req.query;
        const result = await paginatingJobs(page, totalItens);
        res.render('jobs',{result});
    }    
    console.log ('Finded registers: '+ result);
}  

module.exports = { paginatingJobs } ;