import React from 'react';
import './CardInfo.css';

const BookingCardInfo = ({ pickupDate, returnDate, pickupLocation, returnLocation}) => {
    return( 
        <div className='card-info'>
            <h5>З: {pickupDate}</h5>
            <h5>По: {returnDate}</h5>
            <h2>Місце отримання: {pickupLocation}</h2> 
            <h2>Місце повернення: {returnLocation}</h2>         
        </div>
    );
}

export default BookingCardInfo;
