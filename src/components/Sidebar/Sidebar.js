import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import "../Buttons.css";

export const Sidebar = ({ page }) => {
    const [isHome, setHome] = useState(false);
    const [isLikes, setLikes] = useState(false);
    const [isBookings, setBookings] = useState(false);
    const [isProfile, setProfile] = useState(false);
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [avatar, setAvatar] = useState("./image/avatars/1.png");

    useEffect(() => {
        if (page === "home") {
            setHome(true);
            setLikes(false);
            setBookings(false);
            setProfile(false);
        }
        else if (page === "profile") {
            setHome(false);
            setLikes(false);
            setBookings(false);
            setProfile(true);
        }
        else if (page === "likes") {
            setHome(false);
            setLikes(true);
            setBookings(false);
            setProfile(false);
        }
        else if (page === "bookings") {
            setHome(false);
            setLikes(false);
            setBookings(true);
            setProfile(false);
        }
    }, [page]);

    useEffect(() => {
        fetch("http://localhost:8001/users/" + sessionStorage.getItem("username"))
            .then(res => res.json())
            .then(userdata => {
                setId(userdata.id);
                setFullName(userdata.fullname);
                setAvatar(userdata.avatar);
            });
    })

    return (
        <div className="side-bar">
            <div className="side-navbar">
                {isHome ? (
                    <div className="d-flex align-items-center px-4 py-3 rounded-pill">
                        <span className="me-3 position-relative">
                            <img src={require('../image/icons/sidebar_home_filled.png')} alt=""></img>
                        </span>
                        <span className="fw-bold"><a href="/">Головна</a></span>
                    </div>
                ) : (
                    <div className="d-flex align-items-center px-4 py-3 rounded-pill">
                        <span className="me-3 position-relative">
                            <img src={require('../image/icons/sidebar_home_outline.png')} alt=""></img>
                        </span>
                        <span><a href="/">Головна</a></span>
                    </div>
                )}
                {isLikes ? (
                    <div className="d-flex align-items-center px-4 py-3 rounded-pill">
                        <span className="me-3 position-relative">
                            <img src={require('../image/icons/sidebar_likes_filled.png')} alt=""></img>
                        </span>
                        <span className="fw-bold">
                            <a href="/likes">Вподобання</a>
                        </span>
                    </div>
                ) : (
                    <div className="d-flex align-items-center px-4 py-3 rounded-pill">
                        <span className="me-3 position-relative">
                            <img src={require('../image/icons/sidebar_likes_outline.png')} alt=""></img>
                        </span>
                        <span>
                            <a href="/likes">Вподобання</a>
                        </span>
                    </div>
                )}
                {isBookings ? (
                    <div className="d-flex align-items-center px-4 py-3 rounded-pill">
                        <span className="me-3 position-relative">
                            <img src={require('../image/icons/sidebar_bookings_filled.png')} alt=""></img>
                        </span>
                        <span className="fw-bold">
                            <a href="/bookings">Бронювання</a>
                        </span>
                    </div>
                ) : (
                    <div className="d-flex align-items-center px-4 py-3 rounded-pill">
                        <span className="me-3 position-relative">
                            <img src={require('../image/icons/sidebar_bookings_outline.png')} alt=""></img>
                        </span>
                        <span>
                            <a href="/bookings">Бронювання</a>
                        </span>
                    </div>
                )}
                {isProfile ? (
                    <div className="d-flex align-items-center px-4 py-3 rounded-pill">
                        <span className="me-3 position-relative">
                            <img src={require('../image/icons/sidebar_profile_filled.png')} alt=""></img>
                        </span>
                        <span className="fw-bold"><a href="/profile">Профіль</a></span>
                    </div>
                ) : (
                    <div className="d-flex align-items-center px-4 py-3 rounded-pill">
                        <span className="me-3 position-relative">
                            <img src={require('../image/icons/sidebar_profile_outline.png')} alt=""></img>
                        </span>
                        <span>
                            <a href="/profile">Профіль</a>
                        </span>
                    </div>
                )}
            </div>
            <div className="sidebar-userdata">
                <span><img className="rounded-circle" src={avatar} alt=""></img></span>
                <span>
                    <div>
                        <h2 className="fs-4">{fullName}</h2>
                    </div>
                    <div>
                        <h3 className="fs-5">{id}</h3>
                    </div>
                </span>
            </div>
            <div className="sidebar-bottom">
                <a href="/login">
                    <button className="button-blue">
                        <div className='button-content'>
                            <div className='button-icon'>
                                <img src={require('../image/icons/logout_blue.png')} alt=""></img>
                                <img className="img-hover" src={require('../image/icons/logout_black.png')} alt=""></img>
                            </div>
                            <div className='button-label'>Вийти</div>
                        </div>
                    </button>
                </a>
            </div>
        </div>
    );
}