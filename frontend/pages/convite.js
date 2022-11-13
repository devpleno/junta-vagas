import React from "react"

const Convite = () => {

  return (
    <main className="h-screen w-full bg-gray-200 text-center flex flex-col">
      <div className='w-full h-screen flex  items-center justify-center'>
          <a className="container text-3xl font-bold
              text-blue-300 self-center py-20 md:text-6xl" 
              href={process.env.NEXT_PUBLIC_LINK_INVITE_DISCORD} target='_blank'>
            Clique para acessar o Discord
          </a>
      </div>
    </main>
  )
}
export default Convite
