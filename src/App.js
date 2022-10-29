import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {
    const path = "https://w03api.herokuapp.com/users/register"
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [usernameError, setUsernameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [validation, setValidation,] = useState(false);
    const [serverError, setServerError] = useState(null);
    const [urls, setUrls] = useState([]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;

        switch (id) {
            case "username":
                setUsername(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
        }
    }

    const handleSubmitClick = async () => {
        if (!username) {
            setUsernameError("Please enter your username");
            setValidation(true);
        }
        else {
            setUsernameError("");
            setValidation(false);
        }

        if (!email) {
            setEmailError("Please enter your email");
            setValidation(true);
        }
        else {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
                setEmailError("Email is invalid");
                setValidation(true);
            }
            else {
                setEmailError("");
                setValidation(false);
            }
        }

        if (!password) {
            setPasswordError("Please enter your password");
            setValidation(true);
        }
        else {
            if (password.length < 6) {
                setPasswordError("Password must be at least 6 characters");
                setValidation(true);
            }
            else {
                setPasswordError("");
                setValidation(false);
            }
        }

        if (!validation) {
            try {
                const { data } = await axios.post(path, JSON.stringify({ username, email, password }), {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                console.log(data);
            }
            catch (error) {
                setServerError(error.response.data.error);
            }
        }

    }
    return <div className="container">
        <div className="container-signup">
            <div className="text"><b>Create an account</b></div>
            <div className="textbox-username">
                <b><label>Username</label></b>
                <input id="username" placeholder="Enter your username" onChange={(e) => handleInputChange(e)} ></input>
                <label className="error">{usernameError} </label>
            </div>
            <div className="textbox-email">
                <b><label>Email</label></b>
                <input id="email" placeholder="abc@gmail.com" onChange={(e) => handleInputChange(e)}></input>
                <label className="error">{emailError} </label>
            </div>
            <div className="textbox-password">
                <b><label>Password</label></b>
                <input id="password" type="password" placeholder="Enter your password" onChange={(e) => handleInputChange(e)}></input>
                <label className="error">{passwordError} </label>
            </div>
            <button className="button" onClick={handleSubmitClick}>Submit</button>
        </div>
    </div>
};
export default App;

/*import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import  Meme from './Meme/Meme'

function App(){
    const [urls, setUrls] = useState([])
    const handleMemeClick = async() =>{
        const res = await axios.get("https://api.imgflip.com/get_memes");
        setUrls(res.data.data.memes.map(meme => meme.url));
    }
    return <div>
        <div><b>REGISTER</b></div>
        <div>Username <input></input>
            </div> 
        
        <Meme urls={urls}></Meme>
        <button onClick={handleMemeClick}>Click here</button>
    </div>
};
export default App;
*/
