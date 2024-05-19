import React from 'react';
import './CardInfo.css';

const BookingCardInfo = ({ pickupDate, returnDate, pickupLocation, returnLocation}) => {
    return( 
        <div className='card-info'>
            <h5 className='fs-4'>З: {pickupDate}</h5>
            <h5 className='fs-4'>По: {returnDate}</h5>
            <h2 className='fs-4'>Місце отримання: {pickupLocation}</h2> 
            <h2 className='fs-4'>Місце повернення: {returnLocation}</h2>         
        </div>
    );
}

export default BookingCardInfo;
