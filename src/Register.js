import React from "react";
import { useState } from "react"
import service from './service.js'
const Register = (props) => {
    const { setIsLogin } = props;

    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [isFaild, setIsFaild] = useState(false);
    const handleRegister = async () => {

        if (await service.Register(userName, password)) {
            setIsLogin(true);
        }
        else {
            setIsFaild(true);
            setPassword("");
            setUserName("");
        }

    }

    return <>

        <input placeholder="username" onChange={(event) => { setUserName(event.target.value) }} />
        <input placeholder="password" onChange={(event) => { setPassword(event.target.value) }} />
        <input type="button" onClick={handleRegister} value="register" />
        {isFaild && <p>the request faild try again</p>}
    </>
}
export default Register