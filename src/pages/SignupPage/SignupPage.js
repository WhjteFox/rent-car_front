import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './SignupPage.css';
export const SignupPage = () => {
    const [id, change_id] = useState("");
    const [password, change_password] = useState("");
    const [email, change_email] = useState("");
    const [fullname, change_fullname] = useState("");
    const access = "user";
    const avatar = "1";
    const likes = [];

    const navigate = useNavigate();

    const handle_submit = (e) => {
        e.preventDefault();
        let signup_user = { id, fullname, email, password, avatar, access, likes };
        fetch("http://localhost:8001/users/" + signup_user.id).then((res) => {
            return res.json();
        }).then((response) => {
            if (Object.keys(response).length === 0) {
                fetch("http://localhost:8001/users", {
                    method: "POST",
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(signup_user)
                }).then((res) => {
                    navigate('/login');
                }).catch((err) => {
                    console.error(err.message);
                });
            }
            else {
                alert(`Логін '${signup_user.id}' уже існує.\nУвійдіть або придумайте інший логін`);
            }
        })
    }

    return (
        <html>
            <head>
                <title>Реєстрація - RentCar</title>
            </head>
            <body className='container'>
                <div className='container'>
                    <form onSubmit={handle_submit}>
                        <div className='card' data-bs-theme='dark'>
                            <div className='card-header'>
                                <h2>Створити обліковий запис</h2>
                            </div>
                            <div className='card-body'>
                                <img className='rounded-circle' src='./image/avatars/1.png' alt='default avatar'></img>
                                <input required className='form-control' value={id} onChange={e => change_id(e.target.value)} placeholder='Логін*'></input>
                                <input required className='form-control mt-3' value={fullname} onChange={e => change_fullname(e.target.value)} placeholder="Повне ім'я*"></input>
                                <input required className='form-control mt-3' value={password} onChange={e => change_password(e.target.value)} type='password' placeholder='Пароль*'></input>
                                <input required className='form-control mt-3 mb-3' value={email} onChange={e => change_email(e.target.value)} placeholder='E-Mail'></input>
                                <h4 className='fs-5 text-muted'>Поля, позначені зірочкою (*), обов'язкові до заповнення</h4>
                            </div>
                            <div className='card-footer'>
                                <button className='btn btn-primary btn-lg px-5' type='submit'>Зареєструватися</button>
                            </div>
                        </div>
                    </form>
                    <div className='mt-2'>
                        <span className='me-2'>Вже маєте акаунт? </span>
                        <span>
                            <a href='/login'>
                                <button className='btn btn-outline-primary mb-1 px-4 rounded-pill'>Увійти</button>
                            </a>
                        </span>
                    </div>
                </div>
            </body>
        </html>
    )
}
