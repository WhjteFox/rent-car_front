import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Link, useNavigate } from "react-router-dom";
import { Cars } from "../../components/Cars";

export const HomePage = () => {
    const [data, change_data] = useState(null);
    const [filteredData, setFilteredData] = useState(null); 
    let [searchTerm, setSearchTerm] = useState(""); 

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8001/cars").then(res => {
            return res.json();
        }).then(result => {
            change_data(result);
            setFilteredData(result); 
        })
    }, []);

    useEffect(() => {
        let username = sessionStorage.getItem("username");
        if (username === "" || username === null) {
            navigate("/login");
            console.log("Login first");
        }
    }, [navigate]);

    const handleSearch = (e) => {
        searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        const filtered = data.filter(car =>
            car.brand.toLowerCase().includes(searchTerm) ||
            car.model.toLowerCase().includes(searchTerm)
        );
        setFilteredData(filtered);
    };

const handleFilter = (category) => {
    if (category === "") {
        setFilteredData(data);
    } else {
        const filtered = data.filter(car => car.category === category);
        setFilteredData(filtered);
    }
};

    return (
        <html>
            <head>
                <title>Головна - RentCar</title>
            </head>
            <body className="container">
                <div className="page">
                    <Link to={"/login"}>Вийти</Link>
                    <h2>Головна</h2>
                    <div>
                        <input type="text" placeholder="Пошук" onChange={handleSearch} />
                        <select onChange={(e) => handleFilter(e.target.value)}>
                            <option value="">Усі категорії</option>
                            <option value="category1">Седан (Sedan)</option>
                            <option value="category2">Хетчбек (Hatchback)</option>
                            <option value="category3">SUV (Спортивний універсал)</option>
                            <option value="category4">Кросовер (Crossover)</option>
                            <option value="category5">Купе (Coupe)</option>
                            
                        </select>
                    </div>
                    <h3>Список автомобілів</h3>
                    <div className="container">
                        {filteredData && <Cars database={filteredData}></Cars>}
                    </div>
                </div>
            </body>
        </html>
    );
};
