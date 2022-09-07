import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Email = () => {

const [email, setEmail] = useState("");

function displayMessage (status, message) {

    if (status === 201) {
    toast.success(
        message,{
            position: toast.POSITION.TOP_RIGHT
     });
    } else {
     toast.error(
        message, {
            position: toast.POSITION.TOP_RIGHT
    }); 
    }
}

function onChangeEmail (evt) {
    setEmail(evt.target.value);
}

async function getEmailFromForm (evt) {
    let status = 0
    let message = '';
    evt.preventDefault();
    try {
        const res = await axios.post(
            "http://localhost:3000/newsletter/register", {
                'email': email
            }                       
        );
        message = res.data.message;
        status = res.status;              
    } catch(err){
        message = err.response.data.message; 
        status = err.response.status;      
    }
        
    displayMessage(status, message)    
}

    return(
    <div class="mt-1">          
            <div>
                <Link href='/'>
                    <a></a>
                </Link>              
            </div>

            <div class="w-full h-screen flex items-center justify-center">
        <form class="w-full md:w-1/3 bg-white rounded-lg" onSubmit={getEmailFromForm}>
            <div class="flex font-bold justify-center mt-6">
                <img class="h-20 w-20"
                    src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg"/>
            </div>
            <h2 class="text-3xl text-center text-gray-700 mb-4">Informe seu Email, Receber vaga.</h2>
            <div class="px-12 pb-10">
                <div class="w-full mb-2">
                    <div class="flex items-center">
                        <i class='ml-3 fill-current text-gray-400 text-xs z-10 fas fa-user'></i>
                        <input type='text' placeholder="Email" name="email" value={email} onChange={onChangeEmail}
                            class="-mx-6 px-8  w-full border rounded px-3 py-2 text-gray-700 focus:outline-none" />
                    </div>
                </div>
                <div class="w-full mb-2">
                    <div class="flex items-center">
                        <i class='ml-3 fill-current text-gray-400 text-xs z-10 fas fa-lock'></i>
                    </div>
                </div>               
                <button type="submit"
                    class="w-full py-2 rounded-full bg-green-600 text-gray-100  focus:outline-none">Enviar</button>
            </div>                   
        </form>
    </div> 
    <ToastContainer /> 
     </div>      
  )
}

export default Email