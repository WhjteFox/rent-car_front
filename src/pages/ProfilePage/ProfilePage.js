import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../HomePage/HomePage.css";
import { Link } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Header } from "../../components/Header/Header";

export const ProfilePage = () => {
    return (
        <div className="row">
            <div className="col-3 px-0">
                <Sidebar />
            </div>
            <div className="col-8 px-0">
                <Header />
                <div className="container">
                    <div className="page">
                        <Link to={"/login"}>Вийти</Link>
                        <h3>{sessionStorage.getItem("username")}</h3>
                        <h2>Профіль</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
