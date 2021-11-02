import React from "react"
import "../css/styles.css"

export default ({ Component, pageProps }) => {
    return (
        <>
            <Component {...pageProps} />
        </>
    )
}