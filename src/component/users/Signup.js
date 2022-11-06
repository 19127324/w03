import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './Users.css';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Login from './Login';
import { useMutation } from '@tanstack/react-query'
const path = "https://w03api.herokuapp.com/users/register"

function Signup() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [error, setError] = useState(null);
    const [serverError, setServerError] = useState(null);
    const [result, setResult] = useState(false);
    const delay = ms => new Promise(res => setTimeout(res, ms));
    let navigate = useNavigate();
    const { isLoading, mutateAsync } = useMutation(
        signup,
        {
            onError: (error) => {
                setServerError(error.message);
            },
            onSuccess: async (data) => {
                if (data.message == -1) {
                    setError("This email is already exsisted");
                    await delay(5000);
                    setError("")
                }
                else if (data.message == 1) {
                    setResult("Created account successfully");
                    await delay(5000);
                    setResult("")
                }
            },
        }
    );
    const onSubmit = async (values) => {
        try {
            await mutateAsync({
                username: values.username,
                email: values.email,
                password: values.password,
            });
        } catch (error) {

        }
    }
    return <div className="container">
        <div className="container-signup">
            <div className="text"><b>Create an account</b></div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="textbox-username">
                    <label> <b>Username</b></label>
                    <input {...register("username", { required: "Please enter your username" })} placeholder="Enter your username" />
                    <p className="error">{errors.username?.message}</p>
                </div>
                <div className="textbox-email">
                    <label> <b>Email</b></label>
                    <input {...register("email", {
                        required: "Please enter your email",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Invalid email."
                        },
                    })} placeholder="abc@gmail.com" />
                    <p className="error">{errors.email?.message || error}</p>
                </div>
                <div className="textbox-password">
                    <label> <b>Password</b></label>
                    <input {...register("password", {
                        required: "Please enter your password",
                        minLength: {
                            value: 6,
                            message: "Min length is 6"
                        }
                    })} type='password' placeholder="Enter your password" />
                    <p className="error">{errors.password?.message || result}</p>
                </div>
                <div className="link-signup">
                    <label>Already have an account ? </label>
                    <Link to="/login">Log in</Link>
                </div>
                <input className='button' type="submit" value="Sign up" />
            </form>
            {isLoading ? <div className="loading">Loading...</div> : ""}
        </div>
        <Routes>
            <Route path="login" element={<Login />} />
        </Routes>
    </div>
};

export const signup = async ({ username, email, password }) => {
    try {
        const { data } = await axios.post(path, JSON.stringify({ username, email, password }), {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return data;
    }
    catch (error) {

    }

};
export default Signup;