
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
