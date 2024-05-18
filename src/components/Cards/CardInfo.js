import React from 'react';
import './CardInfo.css';

const CardInfo = ({ color, brand, model, price, year}) => {
    return( 
        <div className='card-info'>
            <h5>Колір: {color}</h5>
            <h5>Марка: {brand}</h5>
            <h2>Модель: {model}</h2>
            <h2>Рік випуску: {year}</h2>           
        </div>
    );
}

export default CardInfo;
