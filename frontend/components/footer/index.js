import React from 'react' 
import Link from 'next/link'

const Footer = () => {
    return (

        <div className='bg-gray-700 px-4'>
            <div className='container mx-auto text-center font-bold text-white px-4'>  
                Projeto desenvolvido por:
                equipe do juntas Vagas
                 <br />
                <a href="https://github.com/devpleno/junta-vagas">Clique aqui para acessar Github do projeto</a>
            </div>          
            <div className='container mx-auto text-center min-h-full'>
            <img className='inline p-4" src="https://img.icons8.com/external-filled-outline-icons-maxicons/85/000000/external-browser-type-of-website-filled-outline-filled-outline-icons-maxicons-23.png'/>
            </div>
        </div>
    )
}

export default Footer