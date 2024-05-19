import React from 'react';
import './CardInfo.css';

const CardInfo = ({ color, gearbox, fuel_type, enginesize}) => {
    return( 
        <div className='card-info'>
            <h5>Колір: {color}</h5>
            <h5>Коробка передач: {gearbox}</h5>
            <h2>Тип палива: {fuel_type}</h2>
            <h2>Об'єм двигуна: {enginesize} л</h2>           
        </div>
    );
}

export default CardInfo;
