import React from "react";
import Footer from "../footer"
import Header from "../header"
import Head from 'next/head'


const Layout = ({children}) => {
    return (
      <div>
            <Head>
              <title>Junta vagas - Onde encontra sua vaga de TI</title>
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
              <meta name="title" content="Junta vagas - Onde encontra sua vaga de TI" />
                <meta name="description" content="Vagas de T.I em um único lugar, vagas nas tecnologias: php, java, js, javascript, python, ruby, golang, go, elixir, laravel, springboot, vraptor, node..js, express.js, nest.js, next.js, phonex, Django, ruby on rails, react.js, react, react native, angular, vue e vue.js" />
                <meta name="robots" content="index, follow" />
                <meta http-equiv="content-language" content="pt-br" />
            </Head>
            <Header />
            <div className="container mx-auto">
                {children} 
            </div>
            <Footer />
      </div> 
    ) 
  }

export default Layout