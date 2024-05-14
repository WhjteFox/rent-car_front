import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Link, useNavigate } from "react-router-dom";
import { Cars } from "../../components/Cars";

export const HomePage = () => {
    const [data, change_data] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedPriceRange, setSelectedPriceRange] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8001/cars")
            .then(res => res.json())
            .then(result => {
                change_data(result);
                setFilteredData(result);
            });
    }, []);

    useEffect(() => {
        let username = sessionStorage.getItem("username");
        if (username === "" || username === null) {
            navigate("/login");
            console.log("Login first");
        }
    }, [navigate]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value.toLowerCase());

    };

    useEffect(() => {
        if (searchTerm === null || searchTerm.length === 0) {
            setFilteredData(data);
        }
        else if (searchTerm.length >= 1) {
            const filtered = data.filter((car) =>
                car.brand.toLowerCase().includes(searchTerm) ||
                car.model.toLowerCase().includes(searchTerm)
            );
            setFilteredData(filtered);
        }
    }, [searchTerm, data]);

    const handleFilter = () => {
        let filtered = data;

        if (selectedCategory !== "") {
            filtered = filtered.filter((car) => car.category === selectedCategory);
        }

        if (selectedPriceRange !== "") {
            filtered = filtered.filter(
                (car) => car["class price"] === selectedPriceRange
            );
        }
        setFilteredData(filtered);
    };

    return (
        <div className="container">
            <div className="page">
                <Link to={"/login"}>Вийти</Link>
                <h2>Головна</h2>
                <div className="row g-3">
                    <div className="col-md-4">
                        <input type="text" className="form-control" placeholder="Пошук" onChange={handleSearch} />
                    </div>
                    <div className="col-md-4">
                        <select className="form-select" onChange={(e) => setSelectedCategory(e.target.value)}>
                            <option value="">Тип кузова авто</option>
                            <option value="category1">Седан (Sedan)</option>
                            <option value="category2">Хетчбек (Hatchback)</option>
                            <option value="category3">SUV (Спортивний універсал)</option>
                            <option value="category4">Кросовер (Crossover)</option>
                            <option value="category5">Купе (Coupe)</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <select className="form-select" onChange={(e) => setSelectedPriceRange(e.target.value)}>
                            <option value="">Цінові категорії</option>
                            <option value="econom">економ</option>
                            <option value="medium">середній</option>
                            <option value="business">бізнес клас</option>
                            <option value="premium">преміум клас</option>
                            <option value="luxury">люкс клас</option>
                        </select>
                    </div>
                </div>
                <button className="btn btn-primary mt-2" onClick={handleFilter}>Фільтрувати</button>
                <h3 className="mt-3">Список автомобілів</h3>
                <div className="container">
                    {filteredData && <Cars database={filteredData} />}
                </div>
            </div>
        </div>
    );
};
