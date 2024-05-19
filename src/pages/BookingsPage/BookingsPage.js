import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../HomePage/HomePage.css";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Header } from "../../components/Header/Header";
import { BookedCars } from "../../components/BookedCars";

export const BookingsPage = () => {
    const [filtered_data, change_filtered_data] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let username = sessionStorage.getItem("username");
        if (username === "" || username === null) {
            navigate("/login");
            console.log("Login first");
        }
    }, [navigate]);

    useEffect(() => {
        fetch("http://localhost:8001/bookings")
            .then(res => res.json())
            .then(result => {
                let filtered = result;
                let username = sessionStorage.getItem("username");
                filtered = filtered.filter((booking) => booking.user === username);
                change_filtered_data(filtered);
            });
    }, []);

    return (
        <div className="row">
            <title>Мої бронювання - RentCar</title>
            <div className="col-3 px-0">
                <Sidebar page={"bookings"} />
            </div>
            <div className="col-8 px-0">
                <Header title="Мої бронювання"/>
                <div className="container">
                    <div className="page">
                        <div className="container">
                            {filtered_data && <BookedCars database={filtered_data} user_id={sessionStorage.getItem("username")} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
