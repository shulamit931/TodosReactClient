import React from "react";
import { useState } from "react"
import service from './service.js'
import Register from "./Register.js";
const Login = (props) => {
    const { setIsLogin } = props;

    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [register, setRegister] = useState(false);
    const handleLogin = async () => {
        if (await service.login(userName, password))
            setIsLogin(true);
        else {
            setPassword("");
            setUserName("");
        }
    }

    return <>
        {register ?
            <Register setIsLogin={setIsLogin} /> :
            <>

                <input placeholder="username" onChange={(event) => { setUserName(event.target.value) }} />
                <input placeholder="password" type="password" onChange={(event) => { setPassword(event.target.value) }} />
                <input type="button" onClick={handleLogin} value="login" /><br />
                <input type="button" onClick={() => setRegister(true)} value="register" />

            </>}
    </>
}
export default Login;