import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './EditProfilePage.css';

export const EditProfilePage = () => {
    const [userdata, setUserData] = useState(null);
    const [password, change_password] = useState("");
    const [email, change_email] = useState("");
    const [fullname, change_fullname] = useState("");
    const [editedPassword, change_editedPassword] = useState("");
    const [editedEmail, change_editedEmail] = useState("");
    const [editedFullname, change_editedFullname] = useState("");
    const [defaultAvatar, setDefaultAvatar] = useState('./image/avatars/1.png');
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [avatar, setAvatar] = useState('./image/avatars/1.png');
    const [defaultFullname, setDefaultFullname] = useState("");
    const [defaultPassword, setDefaultPassword] = useState("");
    const [defaultEmail, setDefaultEmail] = useState("");
    const [avatarOptions] = useState([
        './image/avatars/1.png',
        './image/avatars/2.png',
        './image/avatars/3.png',
        './image/avatars/4.png',
        './image/avatars/5.png',
        './image/avatars/6.png',
        './image/avatars/7.png',
        './image/avatars/8.png',
    ]);

    const navigate = useNavigate();

    useEffect(() => {
        let username = sessionStorage.getItem("username");
        if (!username) {
            navigate("/login");
            console.log("Login first");
        }
    }, [navigate]);

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

    useEffect(() => {
        fetch('http://localhost:8001/users/' + sessionStorage.getItem("username"))
            .then(res => res.json())
            .then(userdata => {
                setUserData(userdata);
                setDefaultAvatar(userdata.avatar);
                setDefaultFullname(userdata.fullname);
                setDefaultPassword(userdata.password);
                setDefaultEmail(userdata.email);
            });
    }, []);

    useEffect(() => {
        if (!selectedAvatar) {
            setAvatar(defaultAvatar);
        } else {
            setAvatar(selectedAvatar);
        }
        change_fullname(editedFullname || defaultFullname);
        change_email(editedEmail || defaultEmail);
        change_password(editedPassword || defaultPassword);
    }, [defaultFullname, defaultEmail, defaultPassword, defaultAvatar, editedEmail, editedFullname, editedPassword, selectedAvatar]);

    const handle_submit = (e) => {
        e.preventDefault();
        let signup_user = {
            ...userdata,
            avatar: avatar,
            fullname: fullname,
            email: email,
            password: password
        };
        fetch("http://localhost:8001/users/" + userdata.id, {
            method: "PUT",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(signup_user)
        })
            .then((res) => {
                navigate('/profile');
            })
            .catch((err) => {
                console.error(err.message);
            });
    }

    return (
        <div className='container'>
            <title>Редагування профілю - RentCar</title>
            <form onSubmit={handle_submit} className='form-container'>
                <div className='card'>
                    <div className='card-header'>
                        <h2>Редагування свого профілю</h2>
                    </div>
                    <div className='card-body'>
                        <div className='avatar-settings'>
                            <div>
                                <h3>Твій аватар</h3>
                                {avatar && <img className='rounded-circle' src={avatar} alt='selected avatar' />}
                            </div>
                            <div className='avatar-options'>
                                <h4 className='fs-5'>Вибери:</h4>
                                {avatarOptions.map((avatar, index) => (
                                    <div 
                                        key={index} 
                                        className={`avatar-option ${selectedAvatar === avatar ? 'selected' : ''}`} 
                                        onClick={() => handleAvatarOptionClick(avatar)}
                                    >
                                        <img src={avatar} alt={`avatar ${index + 1}`} />
                                    </div>
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
                        <input
                            className='form-control mt-3'
                            value={editedFullname}
                            onChange={e => change_editedFullname(e.target.value)}
                            placeholder="Змінити ім'я"
                        />
                        <input
                            className='form-control mt-3'
                            value={editedPassword}
                            onChange={e => change_editedPassword(e.target.value)}
                            type='password'
                            placeholder='Змінити пароль'
                        />
                        <input
                            className='form-control mt-3 mb-3'
                            value={editedEmail}
                            onChange={e => change_editedEmail(e.target.value)}
                            placeholder='Змінити E-Mail'
                        />
                    </div>
                    <div className='card-footer'>
                        <button className='btn btn-primary btn-lg px-5' type='submit'>Застосувати зміни</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
