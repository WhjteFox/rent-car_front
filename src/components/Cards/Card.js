import React from 'react';
import CardInfo from './CardInfo.js';
import './Card.css';

const Card = ({ car }) => {
    return (
        <div className='card-container'>
            <img src={car.image} alt={car.model} />
            <CardInfo color={car.color} brand={car.brand} model={car.model} price={car.price} year={car.year} />
        </div>
    );
}

export default Card;