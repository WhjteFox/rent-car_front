import React, { useEffect, useState } from 'react';
import BookingCardInfo from './BookingCardInfo.js';
import './Card.css';
import './CardPrice.css';
import '../Buttons.css';

const BookingCard = ({ booking, user_id }) => {
    const [showCard, setVisibility] = useState(false);
    const [pick_up_date, setPickUpDate] = useState("");
    const [return_date, setReturnDate] = useState("");

    useEffect(() => {
        fetch("http://localhost:8001/bookings/" + booking.id)
            .then(res => res.json())
            .then(bookingdata => {
                if (bookingdata.user === user_id) {
                    setVisibility(true);
                    let pickup_date = new Date(Date.parse(bookingdata.pickUpDate))
                    let pickup_day = pickup_date.getDate();
                    let pickup_month = pickup_date.getMonth();
                    let pickup_year = pickup_date.getFullYear();
                    setPickUpDate(pickup_day + "." + pickup_month + "." + pickup_year);
                    let return_date = new Date(Date.parse(bookingdata.returnDate))
                    let return_day = return_date.getDate();
                    let return_month = return_date.getMonth();
                    let return_year = return_date.getFullYear();
                    setReturnDate(return_day + "." + return_month + "." + return_year);
                }
                else {
                    setVisibility(false);
                }
            });
    }, [user_id, booking.id]);

    const handleDeleteClick = () => {
        fetch("http://localhost:8001/cars/" + booking.car)
            .then((res) => res.json())
            .then(cardata => {
                console.log(cardata);
                cardata.available = true;
                fetch("http://localhost:8001/cars/" + booking.car, {
                    method: "PUT",
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(cardata)
                });
            });
        fetch("http://localhost:8001/bookings/" + booking.id, {
            method: "DELETE"
        }).then(() => {
            setVisibility(false);
        })
    };

    return (
        <div>
            {showCard ? (
                <div className='card-container'>
                    <div className='card-head'>
                        <h2>{booking.carBrand} {booking.carModel} {booking.carYear}</h2>
                    </div>
                    <div className='card-content'>
                        <img src={booking.carImage} alt={booking.carModel} />
                        <div className='empty'></div>
                        <BookingCardInfo pickupDate={pick_up_date} returnDate={return_date} pickupLocation={booking.pickUpLocation} returnLocation={booking.returnLocation} />
                    </div>
                    <div className='card-bottom'>
                        <div className='card-price'>
                            <div>
                                <h6 className='status-gray'>Загальна вартість</h6>
                                <h4 className='price'>${booking.totalPrice}</h4>
                            </div>
                        </div>
                        <div className='button-panel'>
                            <button className='button-gray' onClick={handleDeleteClick}>
                                <div className='button-content'>
                                    <div className='button-icon'>
                                        <img src={require('../image/icons/cross_gray.png')} alt='' />
                                        <img className='img-hover' src={require('../image/icons/cross_black.png')} alt='' />
                                    </div>
                                    <div className='button-label'>Скасувати бронювання</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='empty'></div>
            )
            }
        </div>
    );
}

export default BookingCard;
