import React from "react";
import "./Sidebar.css"

export const Sidebar = () => {
    return (
        <div className="side-bar">
            <div className="side-navbar">
                <div className="d-flex align-items-center px-4 py-3 rounded-pill">
                    <span className="fw-bold">
                        <a href="/">Головна</a>
                    </span>
                </div>
                <div className="d-flex align-items-center px-4 py-3 rounded-pill">
                    <span>
                        <a href="/">Вподобання</a>
                    </span>
                </div>
                <div className="d-flex align-items-center px-4 py-3 rounded-pill">
                    <span>
                        <a href="/">Бронювання</a>
                    </span>
                </div>
                <div className="d-flex align-items-center px-4 py-3 rounded-pill">
                    <span>
                        <a href="/">Профіль</a>
                    </span>
                </div>
            </div>
        </div>
    );
}