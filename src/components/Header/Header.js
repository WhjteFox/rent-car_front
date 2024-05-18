import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'; // Створіть новий файл Header.css

export const Header = () => {
  return (
    <div className="header bg-dark text-light p-4">
      <a className="text-light" href="/">Головна</a>
      <a className="text-light" href="/login">Увійти</a>
      <a className="text-light" href="/signup">Зареєструватися</a>
    </div>
  );
};
