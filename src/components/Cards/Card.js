import React from 'react';
import CardInfo from './CardInfo.js';
import './Card.css';
import './CardButtonPanel.css';

const Card = ({ car }) => {
    return (
        <div className='card-container'>
            <div className='card-head'>
                <h2>{car.brand} {car.model} {car.year}</h2>
            </div>
            <div className='card-content'>
                <img src={car.image} alt={car.model} />
                <div className='empty'></div>
                <CardInfo color={car.color} brand={car.brand} model={car.model} price={car.price} year={car.year} />
            </div>
            <div className='card-bottom'>
                <span className='price'>Від {car.price}$/день</span>
                <div className='button-panel'>
                    <button className='button-red'>
                        <div className='button-content'>
                            <div className='button-icon'>
                                <img src={require('../image/icons/heart_red_outline.png')} alt='' />
                                <img className='img-hover' src={require('../image/icons/heart_black_outline.png')} alt=''  />
                            </div>
                        </div>
                    </button>
                    <button className='button-yellow'>
                        <div className='button-content'>
                            <div className='button-icon'>
                                <img src={require('../image/icons/info_yellow.png')} alt='' />
                                <img className='img-hover' src={require('../image/icons/info_black.png')} alt='' />
                            </div>
                            <div className='button-label'>Інфо</div>
                        </div>
                    </button>
                    <button className='button-green'>
                        <div className='button-content'>
                            <div className='button-icon'>
                                <img src={require('../image/icons/key_green.png')} alt='' />
                                <img className='img-hover' src={require('../image/icons/key_black.png')} alt='' />
                            </div>
                            <div className='button-label'>Забронювати</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;