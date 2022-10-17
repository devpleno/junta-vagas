import React, { useState } from "react"
import axios from "axios"

const Index = (props) => {
    // ESTOU PEGA O props.page(igual 1) É DEFINIDO NO ESTADO CHAMADO page
    const [page, setPage] = useState(props.page)
    // ESTOU PEGA as 10 primeiras vagas props.jobs É DEFINIDO NO ESTADO CHAMADO jobs
    const [jobs, setJobs] = useState(props.jobs)

    // MÉTODO É EXECUTADO QUANDO CLICA NO BOTÃO PARA CARREGAR MAIS VAGAS
    const loadMoreJobs = async (event) => {
        // ESSA LINHA ABAIXO EVITA O COMPORTAMENTO PATRÃO DE QUANDO CLICK EM UM 
        // BOTÃO QUE É CARREGAR A PÁGINA NOVAMENTE É EVITANDO ESSE COMPORTAMENTO
        // POSSO EXECUTAR O RESTO DO CÓDIGO.
        event.preventDefault()

        // AQUI ESTOU INCREMENTANDO O PAGE, POIS QUERO PEGAR AS PROXIMAS 10 VAGAS
        const nextPage = page + 1
        setPage(nextPage)

        // AGORA FAÇO A REQUISIÇÃO PARA PEGAR AS PROXIMAS 10 VAGAS, NO CASO NA REQUEST O QUE MUDA
        // É O page que irá 1 é agora o valor 2. OBS: O VALOR VAI INCREMENTANDO TOTAS AS VEZES QUE CLICK NO BOTÃO
        // PARA CARREGAR MAIS VAGAS.
        const response = await axios.get(`http://localhost:3000/jobs?page=${nextPage}&totalItens=10`);
        const newJobs = response.data;
        
        // AQUI ESTOU PEGANDO AS VAGAS QUE JÁ EXISTEM QUE SÃO UM LISTA E ADICIONANDO AS NOVAS
        // VAGAS A LISTA, QUANDO CHAMO O setJobs ISSO ADICIONA UM LISTA NOVA É O REACT.JS ATUALIZA O 
        // COMPONENTE EXIBINDO AS ANTIGAS VAGAS E AS NOVAS.
        setJobs([...jobs, ...newJobs])
    }      
    return (
        <div> 
            <div>
                { 
                    jobs.map(job => {
                        
                       return(
                           
                            <div className='grid grid-cols-2 gap-6 py-2 px-4 border-solid border-2 border-black'>
                                 <div className='col-span-2 bg-fuchsia-600 px-2 text-black'>{ job.company } <br /></div>
                                 <div className='bg-fuchsia-600 px-2'>{ job.title } </div><br />                                
                                 
                                 <div >
                                      { jobs.map( item => 
                                      <div className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full'>{item.name}<br/>
                                      <a href= { item.link }>See datails</a></div>                                       
                                      )}                                      
                                </div>  
                            </div>             
                        )                                                 
                    })                                                          
                } 
                <br/> 
                <div className='text-center'>               
                    <button onClick={(event) => loadMoreJobs(event) } className='bg-blue-500 hover:bg-blue-700  
                        text-center text-white font-bold py-3 px-20 rounded-md'>
                        Click here to load more jobs
                    </button>
                </div>
            </div> 
        </div>
    )
}
// CÓDIGO ABAIXO IRÁ SER EXECUTADO QUANDO CARREGAR A PÁGINA IRÁ PEGAR AS VAGA É RETORNA.
export async function getServerSideProps() {
    const response = await axios.get("http://localhost:3000/jobs?page=1&totalItens=10");
    const jobs = response.data

    return {
        props: {
            page: 1,
            jobs
        },
    };
}

export default Index 