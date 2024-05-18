import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

export const Header = () => {
    return (
        <div className="header">
            <a href="/">Головна</a>
            <a href="/login">Увійти</a>
            <a href="/signup">Зареєструватися</a>
        </div>
    );
};
