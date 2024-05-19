import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../HomePage/HomePage.css";
import "./ProfilePage.css";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Header } from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("def");
    const [avatar, setAvatar] = useState("./image/avatars/0.png");
    const [email, setEmail] = useState("");
    const [n_likes, setLikes] = useState(0);
    const [n_bookings, setBookings] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        let username = sessionStorage.getItem("username");
        if (username === "" || username === null) {
            navigate("/login");
            console.log("Login first");
        }
    }, [navigate]);

    useEffect(() => {
        fetch("http://localhost:8001/users/" + sessionStorage.getItem("username"))
            .then(res => res.json())
            .then(userdata => {
                setId(userdata.id);
                setFullName(userdata.fullname);
                setAvatar(userdata.avatar);
                setEmail(userdata.email);
                setLikes(userdata.likes.length);
            });
    });

    useEffect(() => {
        let user_id = sessionStorage.getItem("username");
        let n_bookings = 0;
        fetch("http://localhost:8001/bookings/")
            .then(res => res.json())
            .then(bookings => {
                for (let booking of bookings) {
                    if (booking.user === user_id) {
                        n_bookings++;
                    }
                }
                setBookings(n_bookings);
            });
    }, []);

    return (
        <div className="row">
            <title>Мій профіль - RentCar</title>
            <div className="col-3 px-0">
                <Sidebar page={"profile"} />
            </div>
            <div className="col-8 px-0">
                <Header title="Мій профіль"/>
                <div className="container">
                    <div className="page">
                        <div className="profile-container">
                            <div className="avatar-container">
                                <img className="rounded-circle avatar" src={avatar} alt=""></img>
                            </div>
                            <div className="profile-info">
                                <h2>{fullName}</h2>
                                <h3>{id}</h3>
                                <p className="email">
                                    <img src="./image/icons/profile_email.png" alt=""></img>
                                    {email}
                                </p>
                                <p className="likes">
                                    <img src="./image/icons/profile_likes.png" alt=""></img>
                                    Вподобань: {n_likes}
                                </p>
                                <p className="bookings">
                                    <img src="./image/icons/profile_bookings.png" alt=""></img>
                                    Бронювань: {n_bookings}
                                </p>
                                <div className="editprofile">
                                    <a href="/editprofile">
                                        <button className="btn btn-outline-secondary rounded-pill px-5 fs-5">Редагувати профіль</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
