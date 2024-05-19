import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css";

export const LoginPage = () => {
    const [username, update_username] = useState("");
    const [password, update_password] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const LoginProceed = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("proceeding...");
            fetch("http://localhost:8001/users/" + username).then((res) => {
                return res.json();
            }).then((response) => {
                console.log(response);
                if (Object.keys(response).length === 0) {
                    alert("Хибний логін або пароль");
                }
                else {
                    if (response.password === password) {
                        console.log("Login success. Welcome, " + username);
                        sessionStorage.setItem("username", username);
                        navigate("/");
                    }
                    else {
                        alert("Хибний логін або пароль");
                    }
                }
            }).catch((err) => {
                console.log("Login error:" + err.message);
            });
        }
    }

    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            console.log("username not entered");
        }
        if (password === '' || password === null) {
            result = false;
            console.log("password not entered");
        }
        return result;
    }

    return (
        <div className='container'>
            <title>Увійти - RentCar</title>
            <div className='login-form'>
                <form onSubmit={LoginProceed}>
                    <div className='card' data-bs-theme='dark'>
                        <div className='card-header'>
                            <h2>Увійти</h2>
                        </div>
                        <div className='card-body py-4'>
                            <input required className='form-control' value={username} onChange={e => update_username(e.target.value)} placeholder='Логін'></input>
                            <input required className='form-control mt-4' type='password' value={password} onChange={e => update_password(e.target.value)} placeholder='Пароль'></input>
                        </div>
                        <div className='card-footer'>
                            <button className='btn btn-primary btn-lg px-5' type='submit'>Вхід</button>
                        </div>
                    </div>
                </form>
                <div className='mt-2'>
                    <span className='me-2'>Не маєте акаунту? </span>
                    <span>
                        <a href='/signup'>
                            <button className='btn btn-outline-primary mb-1 px-4 rounded-pill'>Зареєструватися</button>
                        </a>
                    </span>
                </div>
            </div>
        </div>
    )
}