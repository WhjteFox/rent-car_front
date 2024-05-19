import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadFull } from "tsparticles";
import { tsParticles } from "tsparticles-engine";
import Particles from 'react-tsparticles';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
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
                } else {
                    if (response.password === password) {
                        console.log("Login success. Welcome, " + username);
                        sessionStorage.setItem("username", username);
                        navigate("/");
                    } else {
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
            <Particles
                id="tsparticles"
                init={loadFull(tsParticles)}
                options={{
                    "particles": {
                        "number": {
                            "value": 80,
                            "density": {
                                "enable": true,
                                "value_area": 800
                            }
                        },
                        "color": {
                            "value": "#ffffff"
                        },
                        "shape": {
                            "type": "circle",
                            "stroke": {
                                "width": 0,
                                "color": "#000000"
                            },
                            "polygon": {
                                "nb_sides": 5
                            },
                            "image": {
                                "src": "img/github.svg",
                                "width": 100,
                                "height": 100
                            }
                        },
                        "opacity": {
                            "value": 0.5,
                            "random": false,
                            "anim": {
                                "enable": false,
                                "speed": 1,
                                "opacity_min": 0.1,
                                "sync": false
                            }
                        },
                        "size": {
                            "value": 5,
                            "random": true,
                            "anim": {
                                "enable": false,
                                "speed": 40,
                                "size_min": 0.1,
                                "sync": false
                            }
                        },
                        "line_linked": {
                            "enable": true,
                            "distance": 150,
                            "color": "#ffffff",
                            "opacity": 0.4,
                            "width": 1
                        },
                        "move": {
                            "enable": true,
                            "speed": 6,
                            "direction": "none",
                            "random": false,
                            "straight": false,
                            "out_mode": "out",
                            "attract": {
                                "enable": false,
                                "rotateX": 600,
                                "rotateY": 1200
                            }
                        }
                    },
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "repulse"
                            },
                            "onclick": {
                                "enable": true,
                                "mode": "push"
                            },
                            "resize": true
                        },
                        "modes": {
                            "grab": {
                                "distance": 400,
                                "line_linked": {
                                    "opacity": 1
                                }
                            },
                            "bubble": {
                                "distance": 400,
                                "size": 40,
                                "duration": 2,
                                "opacity": 8,
                                "speed": 3
                            },
                            "repulse": {
                                "distance": 200
                            },
                            "push": {
                                "particles_nb": 4
                            },
                            "remove": {
                                "particles_nb": 2
                            }
                        }
                    },
                    "retina_detect": true,
                    "config_demo": {
                        "hide_card": false,
                        "background_color": "#b61924",
                        "background_image": "",
                        "background_position": "50% 50%",
                        "background_repeat": "no-repeat",
                        "background_size": "cover"
                    }
                }}
            />
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
    );
}
