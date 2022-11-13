import React from 'react' 
import Link from 'next/link'

const Footer = () => {
    return (

        <div className='bg-gray-700 px-4'>
            <div className='container mx-auto text-center font-bold text-white px-4'>  
                Projeto desenvolvido por:
                equipe do juntas Vagas <br />
                <a href='www.linkedin.com/in/carlosnasciemnto'>Linkedin</a>/
                <a href='https://github.com/Carlos-Nasciemnto'>Github</a>                
            </div>          
            <div className='container mx-auto text-center min-h-full'>
            <img className='inline p-4" src="https://img.icons8.com/external-filled-outline-icons-maxicons/85/000000/external-browser-type-of-website-filled-outline-filled-outline-icons-maxicons-23.png'/>
            </div>
        </div>
    )
}

export default Footer