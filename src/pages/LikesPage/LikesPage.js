import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../HomePage/HomePage.css";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Header } from "../../components/Header/Header";
import { LikedCars } from "../../components/LikedCars";

export const LikesPage = () => {
    const [data, change_data] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8001/cars")
            .then(res => res.json())
            .then(result => {
                change_data(result);
            });
    }, []);

    useEffect(() => {
        let username = sessionStorage.getItem("username");
        if (username === "" || username === null) {
            navigate("/login");
            console.log("Login first");
        }
    }, [navigate]);

    return (
        <div className="row">
            <div className="col-3 px-0">
                <Sidebar page={"likes"} />
            </div>
            <div className="col-8 px-0">
                <Header />
                <div className="container">
                    <div className="page">
                        <h2>Список бажаного</h2>
                        <div className="container">
                            {data && <LikedCars database={data} user_id={sessionStorage.getItem("username")} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
