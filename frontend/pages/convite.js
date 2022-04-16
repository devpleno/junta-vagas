import React from "react";
import Link from "next/link";

const Convite = () => {
    return (
        <main className="h-screen w-full bg-gray-200 text-center flex flex-col">
        <Link href='/'>
            <a></a>
        </Link>              
   
        <div class='w-full h-screen flex  items-center justify-center'>       
             <h1 className="container text-3xl font-bold
              text-blue-700 self-center py-20 md:text-6xl"> Acesse o Link de convite para entrar no Discord <br /></h1>             
            <h2 className="container text-3xl font-bold
              text-black self-center  md:text-6xl">   
                <a href='https://discord.gg/FEqZP2bQ'><br />  Entre aqui  </a> 
            </h2>
        </div>
    </main>
    )
}
export default Convite