import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './SignupPage.css';

export const SignupPage = () => {
    const [id, change_id] = useState("");
    const [password, change_password] = useState("");
    const [email, change_email] = useState("");
    const [fullname, change_fullname] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState("./image/avatars/1.png");
    const [avatarOptions] = useState([
        './image/avatars/1.png',
        './image/avatars/2.png',
        './image/avatars/3.png',
        './image/avatars/4.png',
        './image/avatars/5.png',
        './image/avatars/6.png',
    ]);
    const access = "user";
    const likes = [];

    const navigate = useNavigate();

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setSelectedAvatar(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAvatarOptionClick = (avatar) => {
        setSelectedAvatar(avatar);
    };

    const handle_submit = (e) => {
        e.preventDefault();
        let signup_user = { id, fullname, email, password, avatar: selectedAvatar, access, likes };
        fetch("http://localhost:8001/users/" + signup_user.id)
            .then((res) => res.json())
            .then((response) => {
                if (Object.keys(response).length === 0) {
                    fetch("http://localhost:8001/users", {
                        method: "POST",
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify(signup_user)
                    })
                        .then((res) => {
                            navigate('/login');
                        })
                        .catch((err) => {
                            console.error(err.message);
                        });
                } else {
                    alert(`Логін '${signup_user.id}' уже існує.\nУвійдіть або придумайте інший логін`);
                }
            });
    }

    return (
        <div className='container'>
            <title>Рестрація - RentCar</title>
            <form onSubmit={handle_submit}>
                <div className='card' data-bs-theme='dark'>
                    <div className='card-header'>
                        <h2>Створити обліковий запис</h2>
                    </div>
                    <div className='card-body'>
                        <div className='avatar-settings'>
                            <div>
                                <h3>Аватар</h3>
                                {selectedAvatar && <img className='rounded-circle' src={selectedAvatar} alt='selected avatar' />}
                            </div>
                            <div className='avatar-options'>
                                <h4 className='fs-5'>Виберіть зі списку:</h4>
                                {avatarOptions.map((avatar, index) => (
                                    <img
                                        key={index}
                                        className={`avatar-option ${selectedAvatar === avatar ? 'selected' : ''}`}
                                        src={avatar}
                                        alt={`avatar ${index + 1}`}
                                        onClick={() => handleAvatarOptionClick(avatar)}
                                    />
                                ))}
                                <h4 className='fs-5'>Або</h4>
                                <input
                                    type='file'
                                    accept='image/*'
                                    className='form-control mt-1 mb-2'
                                    onChange={handleAvatarChange}
                                />
                            </div>
                        </div>
                        <h4 className='mb-3'>Особисті дані</h4>
                        <input
                            required
                            className='form-control'
                            value={id}
                            onChange={e => change_id(e.target.value)}
                            placeholder='Логін*'
                        />
                        <input
                            required
                            className='form-control mt-3'
                            value={fullname}
                            onChange={e => change_fullname(e.target.value)}
                            placeholder="Повне ім'я*"
                        />
                        <input
                            required
                            className='form-control mt-3'
                            value={password}
                            onChange={e => change_password(e.target.value)}
                            type='password'
                            placeholder='Пароль*'
                        />
                        <input
                            required
                            className='form-control mt-3 mb-2'
                            value={email}
                            onChange={e => change_email(e.target.value)}
                            placeholder='E-Mail'
                        />
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
    )
}
