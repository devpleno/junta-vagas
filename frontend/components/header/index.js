import React from "react";
import styles from './styles.module.css'
import Link from "next/link"; 

const Header = () => {
    return(
        <React.Fragment>
          <div className={styles.wrapper}>
               <div className='container mx-auto text-center min-h-full'>
               <img  className="inline p-4 " src="https://img.icons8.com/external-xnimrodx-lineal-gradient-xnimrodx/64/000000/external-job-startup-business-xnimrodx-lineal-gradient-xnimrodx.png"/>

               </div>
         </div>
     <div className='bg-gray-300 p-4 shadow-md'>
            <div> 
                                   
                <Link href='/about'>
                    <a className='px-2 hover:underline'>About</a>
                </Link>                
            
                <Link href='/email'>
                    <a className='px-2 hover:underline'>Email</a>
                </Link>

                <Link href='/convite'>
                    <a className='px-2 hover:underline'>Discord</a>
                </Link>

                <Link href='/list'>
                    <a className='px-2 hover:underline'>List</a>
                </Link>
             </div> 
     </div>
     </React.Fragment>

    )
}

export default Header
