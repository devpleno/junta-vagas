import React from "react";
import Footer from "../footer"
import Header from "../header"


const Layout = ({children}) => {
    return (
      <div>
            <Header />
            <div className="container mx-auto">
                {children} 
            </div>
            <Footer />
      </div>  

    ) 
}

export default Layout