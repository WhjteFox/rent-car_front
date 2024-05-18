import React from "react";
import "./Sidebar.css"

export const Sidebar = () => {
    return (
        <div className="side-bar">
            <div className="side-navbar">
                <div className="d-flex align-items-center px-4 py-3 rounded-pill">
                    <span className="me-3 position-relative">
                        <img src={require('../image/icons/sidebar_home_filled.png')} alt=""></img>
                    </span>
                    <span className="fw-bold">
                        <a href="/">Головна</a>
                    </span>
                </div>
                <div className="d-flex align-items-center px-4 py-3 rounded-pill">
                    <span className="me-3 position-relative">
                        <img src={require('../image/icons/sidebar_likes_outline.png')} alt=""></img>
                    </span>
                    <span>
                        <a href="/">Вподобання</a>
                    </span>
                </div>
                <div className="d-flex align-items-center px-4 py-3 rounded-pill">
                    <span className="me-3 position-relative">
                        <img src={require('../image/icons/sidebar_bookings_outline.png')} alt=""></img>
                    </span>
                    <span>
                        <a href="/">Бронювання</a>
                    </span>
                </div>
                <div className="d-flex align-items-center px-4 py-3 rounded-pill">
                    <span className="me-3 position-relative">
                        <img src={require('../image/icons/sidebar_profile_outline.png')} alt=""></img>
                    </span>
                    <span>
                        <a href="/">Профіль</a>
                    </span>
                </div>
            </div>
        </div>
    );
}