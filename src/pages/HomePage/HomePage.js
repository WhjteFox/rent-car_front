import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Link, useNavigate } from "react-router-dom";
import { Cars } from "../../components/Cars";
export const HomePage = () => {
    const[data, change_data] = useState(null);
   
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8001/cars").then(res => {
            return res.json();
        }).then(result => {
            change_data(result);
        })
    }, []);

    useEffect(() => {
        let username = sessionStorage.getItem("username");
        if (username === "" || username === null) {
            navigate("/login");
            console.log("Login first");
        }
    }, [navigate]);

    return (
        <html>
            <head>
                <title>Головна - RentCar</title>
            </head>
            <body className="container">
                <div className="page">
                    <Link to={"/login"}>Вийти</Link>
                    <h2>Головна</h2>
                    <h3>Список автомобілів</h3>
                    <div className="container">
                        {data && <Cars database={data}></Cars>}
                    </div>
                </div>
            </body>
        </html>
    )
}
