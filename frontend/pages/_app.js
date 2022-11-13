import React from "react"
import "../css/styles.css"
import Layout from "../components/layout"


export default ({ Component, pageProps }) => {
    return (  
        <Layout>
            <Component {...pageProps} />
        </Layout>                 
    )
}
