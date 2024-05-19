import React, { useEffect, useState } from "react";
import "./Sidebar.css";

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
        } else if (page === "profile") {
            setHome(false);
            setLikes(false);
            setBookings(false);
            setProfile(true);
        } else if (page === "likes") {
            setHome(false);
            setLikes(true);
            setBookings(false);
            setProfile(false);
        } else if (page === "bookings") {
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
    }, []);

    return (
        <div className="side-bar">
            <div className="side-navbar">
                <div className="logo-container">
                    <img src="./image/Logo.png" alt="RentCar logo" />
                </div>
                <a href="/" className={isHome ? "active" : ""}>
                    Головна
                </a>
                <a href="/likes" className={isLikes ? "active" : ""}>
                    Вподобання
                </a>
                <a href="/bookings" className={isBookings ? "active" : ""}>
                    Бронювання
                </a>
                <a href="/profile" className={isProfile ? "active" : ""}>
                    Профіль
                </a>
            </div>
            <div className="sidebar-userdata">
                <span>
                    <img className="rounded-circle" src={avatar} alt="" />
                </span>
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
                    <button className="button">
                        Вийти
                    </button>
                </a>
            </div>
        </div>
    );
}
