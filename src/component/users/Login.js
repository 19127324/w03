import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './Users.css';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Signup from "./Signup";
import Home from "./Home";
import { useMutation } from '@tanstack/react-query'
const path = "https://nice-gold-blackbuck-hem.cyclic.app/users/login"

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState(null);
    const [serverError, setServerError] = useState(null);
    let navigate = useNavigate();

    const { isLoading, mutateAsync } = useMutation(
        login,
        {
            onError: (error) => {
                setServerError(error.message);
            },
            onSuccess: async (data) => {
                try{
                    if (data.message == "User logged in successfully!") {
                        localStorage.setItem("accessToken", data.token);
                        navigate('/home');
                    }
                }
                catch(e){
                    setError("Incorrect username or password");
                    const delay = ms => new Promise(res => setTimeout(res, ms));
                    await delay(3000);
                    setError("")
                }
            },
        }
    );
    const onSubmit = async (values) => {
        try {
            await mutateAsync({
                username: values.username,
                password: values.password,
            });
        } catch (error) {

        }
    }
    return (
        <div className="container">
            <div className="container-login">
                <div className="text-login"><b>Login</b></div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="textbox-username">
                        <label> <b>Username</b></label>
                        <input {...register("username", { required: "Please enter your username" })} />
                        <p className="error">{errors.username?.message}</p>
                    </div>
                    <div className="textbox-password-login">
                        <label> <b>Password</b></label>
                        <input {...register("password", {
                            required: "Please enter your password",
                            minLength: {
                                value: 6,
                                message: "Min length is 6"
                            }
                        })} type='password' />
                        <p className="error">{errors.password?.message || error}</p>
                    </div>
                    <div className="link-login">
                        <label>Already have an account ? </label>
                        <Link to="/signup">Signup</Link>
                    </div>
                    <input className='button-login' type="submit" value="Log in" />
                </form>
                {isLoading ? <div className="loading">is loading...</div> : ""}
            </div>
            <Routes>
                <Route path="signup" element={<Signup />} />
                <Route path="home" element={<Home />} />
            </Routes>
        </div>
    );
};

export const login = async ({ username, password }) => {
    try {
        const { data } = await axios.post(path, JSON.stringify({ username, password }), {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return data;
    }
    catch (error) {

    }

};
export default Login;