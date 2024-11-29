import React, { useState } from 'react'
import  './Login.css'
import assets from '../../assets/assets'
import { singup , login ,resetPass} from '../../config/firebase.js';


export default function Login() {

    const [currState, setCurrState] = useState("Sign up");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (currState === "Sign up") {
            singup(userName,email,password);
        }
        else{
            login(email,password)
        }
    }

  return (
    <div className='login'>
        <img src={assets.logo_big} alt="" className='logo' />
        <form  onSubmit={onSubmitHandler} className="login-form">
            <h2>{currState}</h2>
            {currState === "Sign up" ?<input onChange={(e)=>setUserName(e.target.value)}  value={userName} type="text" placeholder='username' className='form-input' required /> :null}
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Email address' className='form-input' required/>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='password' className='form-input' required/>
            <button type='submit'>{currState ==="Sign up" ? "Create account" : "Login Now"}</button>
            <div className="login-term">
                <input type="checkbox" />
                <p>Agree to the terms of use & privacy policy.</p>
            </div>
            <div className="login-forget">
                {
                    currState === "Sign up"
                    ?<p className="login-toggle">Already have an account <span onClick={()=>setCurrState("Login")}>Login here</span></p>
                    :<p className="login-toggle">Create  an account <span onClick={()=>setCurrState("Sign up")}>click here</span></p>
                }
                {currState === "Login" ?<p className="login-toggle">Forget Password ? <span onClick={()=>resetPass(email)}>reset here</span></p> :null }
            </div>
        </form>
    </div>
  )
}
