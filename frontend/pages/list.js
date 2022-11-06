import React, { useState } from "react"
import axios from "axios"

const Index = (props) => {
    
    const [page, setPage] = useState(props.page)
    
    const [jobs, setJobs] = useState(props.jobs)

   
    const loadMoreJobs = async (event) => {      
        event.preventDefault()
        const nextPage = page + 1
        setPage(nextPage)  
              
        const response = await axios.get(`http://localhost:3000/jobs?page=${nextPage}&totalItens=10`);
        const newJobs = response.data;        
        
        setJobs([...jobs, ...newJobs])
    }      
    return (
        <div> 
            <div>
                { 
                    jobs.map(job => {
                        
                       return(
                           
                            <div className='grid grid-cols-2 gap-4 m-5 py-3 px-4 border-solid border-2 border-black'>
                                 <div className='col-span-2 bg-fuchsia-600 px-1 text-black'>Company: { job.company } <br /></div>
                                 <div className='bg-fuchsia-600 px-2'>Title: { job.title } </div><br /> 
                                 <div className='bg-fuchsia-600 px-1 text-black'>Platform: { job.platform } </div><br />                               
                                 <div className='bg-fuchsia-600 px-1 text-black'>Post: { job.postedAt } </div><br />

                                 <div >
                                        <a href={job.link} target="_blank" class="bg-blue-500 hover:bg--700 text-white font-bold py-2 px-4 rounded-full">
                                            See details
                                        </a>                                       
                                </div>  
                            </div>             
                        )                                                 
                    })                                                          
                } 
                <br/> 
                <div className='text-center'>               
                    <button onClick={(event) => loadMoreJobs(event) } className='bg-blue-500 hover:bg-blue-700  
                        text-center text-white font-bold py-3 m-5 px-20 rounded-md'>
                        Click here to load more jobs
                    </button>
                </div>
            </div> 
        </div>
    )
}
export async function getServerSideProps() {
    const response = await axios.get(`${process.env.API_URL}/jobs?page=1&totalItens=10`);
    const jobs = response.data

    return {
        props: {
            page: 1,
            jobs
        },
    };
}

export default Index 