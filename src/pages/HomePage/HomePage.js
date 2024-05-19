import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { Cars } from "../../components/Cars";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Header } from "../../components/Header/Header";

export const HomePage = () => {
    const [data, change_data] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedPriceRange, setSelectedPriceRange] = useState("");
    const [selectedFuelType, setSelectedFuelType] = useState("");
    const [selectedGearbox, setSelectedGearbox] = useState("");
    const [selectedBrand, setSelectedBrand] = useState(""); 

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
        } else if (searchTerm.length >= 1) {
            const filtered = data.filter((car) =>
                car.brand.toLowerCase().includes(searchTerm) ||
                car.model.toLowerCase().includes(searchTerm)
            );
            setFilteredData(filtered);
        }
    }, [searchTerm, data]);

    const handleFuelTypeChange = (e) => {
        setSelectedFuelType(e.target.value);
    };

    const handleGearboxChange = (e) => {
        setSelectedGearbox(e.target.value);
    };

    const handleBrandChange = (e) => { 
        setSelectedBrand(e.target.value);
    };

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

        if (selectedFuelType !== "") {
            filtered = filtered.filter((car) => car.fuel_type === selectedFuelType);
        }

        if (selectedGearbox !== "") {
            filtered = filtered.filter((car) => car.gearbox === selectedGearbox);
        }

        if (selectedBrand !== "") { 
            filtered = filtered.filter((car) => car.brand === selectedBrand);
        }

        setFilteredData(filtered);
    };

    return (
        <div className="row">
            <div className="col-3 px-0">
                <Sidebar page={"home"} />
            </div>
            <div className="col-8 px-0">
                <Header />
                <div className="container">
                    <div className="page">
                        <h2>Головна</h2>
                        <div className="row g-3">
                            <div className="col-md-4">
                                <input type="text" className="form-control rounded-pill" placeholder="Пошук" onChange={handleSearch} />
                            </div>
                            <div className="col-md-4">
                                <select className="form-select" onChange={(e) => setSelectedCategory(e.target.value)}>
                                    <option value="">Тип кузова авто</option>
                                    <option value="category1">Седан (Sedan)</option>
                                    <option value="category2">Хетчбек (Hatchback)</option>
                                    <option value="category3">Спортивний універсал (SUV)</option>
                                    <option value="category4">Кросовер (Crossover)</option>
                                    <option value="category5">Купе (Coupe)</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <select className="form-select" onChange={(e) => setSelectedPriceRange(e.target.value)}>
                                    <option value="">Цінові категорії</option>
                                    <option value="econom">економ до 30$</option>
                                    <option value="medium">середній до 40$</option>
                                    <option value="business">бізнес до 50$</option>
                                    <option value="premium">преміум до 60$</option>
                                    <option value="luxury">люкс до 70$</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <select className="form-select" onChange={handleFuelTypeChange}>
                                    <option value="">Тип пального</option>
                                    <option value="Бензин">Бензин</option>
                                    <option value="Дизель">Дизель</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <select className="form-select" onChange={handleGearboxChange}>
                                    <option value="">Тип коробки передач</option>
                                    <option value="Автоматична">Автоматична</option>
                                    <option value="Механічна">Механічна</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <select className="form-select" onChange={handleBrandChange}>
                                    <option value="">Бренд</option>
                                    <option value="Ford">Ford</option>
                                    <option value="Toyota">Toyota</option>
                                    <option value="Toyota">Honda</option>
                                    <option value="Toyota">Nissan</option>
                                    <option value="Toyota">Hyundai</option>
                                    <option value="Toyota">Kia</option>
                                    <option value="Toyota">Volkswagen</option>
                                    <option value="Toyota">BMW</option>
                                    <option value="Toyota">Audi</option>
                                    <option value="Toyota">Mercedes</option>
                                    <option value="Toyota">Renault</option>
                                    <option value="Toyota">Volvo</option>
                                </select>
                            </div>
                        </div>
                        <button className="btn btn-primary mt-2" onClick={handleFilter}>Фільтрувати</button>
                        <h3 className="mt-3">Список автомобілів</h3>
                        <div className="container">
                            {filteredData && <Cars database={filteredData} user_id={sessionStorage.getItem("username")} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
