import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { SubmitButton } from "../components/Button"
import { InputLabel } from "../components/InputLabel"
import { SigninInputs,SignupInputs } from "medium-app-common-adnan"
import {BACKEND_URL_CLOUD, BACKEND_URL_LOCAL} from '../../config'
import axios from "axios"

export const Signup = ()=>{
    const [postInputs,setPostInput] = useState<SignupInputs>({
        email:"",
        password:"",
        name:""
    })
    const navigate = useNavigate();
    console.log(postInputs);
    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL_LOCAL}/user/signup`,
               postInputs
            )
            console.log(response)
            const jwt = response.headers['authorization'];
            localStorage.setItem('token',jwt);
            navigate('/blogs');
        }catch(e){
            console.log(e);
        }
        

    }
    return (
        <div className="px-20 py-10 h-screen lg:flex justify-center items-center gap-x-40 bg-slate-200 font-sans	">
            <div className="bg-slate-100 px-5 py-10 rounded lg:w-1/4 text-center shadow-lg h-4/5">
                <h1 className="text-2xl font-medium">Create an Account</h1>
                <p className="mb-10 italic">Already have an account <a href="/signin" className="font-bold text-blue-600">Login</a></p>
                    <form action="" className="text-left">
                        <InputLabel label="Username" placeholder="Enter your username" type="text" onChange={(e)=>{
                            setPostInput({...postInputs,
                                name:e.target.value
                            })
                        }}/>
                        <InputLabel label="Email" placeholder="Enter your Email" type="email" onChange={(e)=>{
                            setPostInput({...postInputs,
                                email:e.target.value
                            })
                        }}/>
                        <InputLabel label="Password" placeholder="Enter your password" type="password"
                        onChange={(e)=>{
                            setPostInput({...postInputs,
                                password:e.target.value
                            })
                        }}/>
                        <SubmitButton onClick={(e)=>{
                            e.preventDefault();
                            sendRequest();
                        }}/>
                    </form>
            </div>
            <div className="w-2/4 h-3/4 invisible lg:visible" >
                <h1 className="text-2xl font-medium leading-6 text-slate-800 mt-40">"Carry out a random act of kindness, with no expectation of
                reward, safe in the knowledge that one day someone might do the same for you".</h1>
                <p className="italic mt-5 text-right">~James Heatfiled <br /> CEO, Metallica</p>
            </div>
            
        </div>
    )
}