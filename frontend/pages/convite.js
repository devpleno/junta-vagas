import React from "react";
import Link from "next/link";

const Convite = () => {
      return (
        <main className="h-screen w-full bg-gray-200 text-center flex flex-col">
        <Link href='/'>
            <a></a>
        </Link>              
   
        <div className='w-full h-screen flex  items-center justify-center'>       
             <h1 className="container text-3xl font-bold
              text-blue-300 self-center py-20 md:text-6xl"> Link Discord <br /></h1>             
            <h2 className="container text-2xl font-bold
              text-black self-center  md:text-6xl" >                
                 <a href={ process.env.NEXT_PUBLIC_LINK_DISCORD } target='_blank'>
                    {process.env.NEXT_PUBLIC_LINK_DISCORD}
                 </a> 
            </h2>
            
           
        </div>
    </main>
    )
}
export default Convite
