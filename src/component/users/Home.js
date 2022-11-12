import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Home() {
  const [username, setUsername] = useState("null")
  const [email, setEmail] = useState("null")
  let navigate = useNavigate();
  useEffect(() => {
    async function getInformation() {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const res = await getProfile(accessToken);
          setUsername(res.data.user.username);
          setEmail(res.data.user.email);
        } catch (error) {
          localStorage.removeItem("accessToken");
        }
      }
    }
    getInformation()
  }, [])
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login")
  }
  return <div className="container">
    <div className="container-login">
      <div className="text-info"><b>Infomation</b></div>
      <div className="textbox-username">
        <label> <b>Username</b></label>
        <input value={username} disabled="disabled"></input>
      </div>
      <div className="textbox-email">
        <label> <b>Email</b></label>
        <input value={email} disabled="disabled"></input>
      </div>
      <button className="button-login" onClick={handleLogout}>Logout</button>
    </div>
  </div>;
};

const api = axios.create({
  baseURL: "https://nice-gold-blackbuck-hem.cyclic.app",
});

api.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
})

export const getProfile = async () => {
  try {
    const res = await api.get("/users/profile");
    return res;
  } catch (error) {
    throw Error(error.res.data);;
  }
}
export default Home;