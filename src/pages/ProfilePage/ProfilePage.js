import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../HomePage/HomePage.css";
import "./ProfilePage.css";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Header } from "../../components/Header/Header";

export const ProfilePage = () => {
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("def");
    const [avatar, setAvatar] = useState("./image/avatars/0.png");
    const [email, setEmail] = useState("");

    useEffect(() => {
        fetch("http://localhost:8001/users/" + sessionStorage.getItem("username"))
            .then(res => res.json())
            .then(userdata => {
                setId(userdata.id);
                setFullName(userdata.fullname);
                setAvatar(userdata.avatar);
                setEmail(userdata.email);
            });
    })

    return (
        <div className="row">
            <div className="col-3 px-0">
                <Sidebar page={"profile"} />
            </div>
            <div className="col-8 px-0">
                <Header />
                <div className="container">
                    <div className="page">
                        <h2>Мій профіль</h2>
                        <div className="profile-container">
                            <div className="avatar-container">
                                <img className="rounded-circle" src={avatar} alt=""></img>
                            </div>
                            <button className="btn btn-outline-secondary rounded-pill px-5 fs-5">Редагувати профіль</button>
                        </div>
                        <div className="profile-info">
                            <h2>{fullName}</h2>
                            <h3>{id}</h3>
                            <h4 className="mt-4">{email}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
