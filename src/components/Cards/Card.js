import React, { useEffect, useState } from 'react';
import CardInfo from './CardInfo.js';
import InfoModal from './InfoModal.js';
import BookingModal from './BookingModal.js';
import './Card.css';
import './CardPrice.css';
import '../Buttons.css';

const Card = ({ car, user_id }) => {
    const [showModal, setShowModal] = useState(false);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [isReserved, setIsReserved] = useState(false);
    const [like_icon, setLikeIcon] = useState('./image/icons/heart_red_outline.png');
    const [like_hover_icon, setLikeHoverIcon] = useState('./image/icons/heart_black_outline.png');

    useEffect(() => {
        fetch("http://localhost:8001/users/" + user_id)
            .then(res => res.json())
            .then(result => {
                if (result.likes.includes(car.id)) {
                    setLikeIcon('./image/icons/heart_red_filled.png');
                    setLikeHoverIcon('./image/icons/heart_black_filled.png')
                }
                else {
                    setLikeIcon('./image/icons/heart_red_outline.png');
                    setLikeHoverIcon('./image/icons/heart_black_outline.png')
                }
            });
    }, [user_id, car.id]);

    useEffect(() => {
        fetch("http://localhost:8001/cars/" + car.id)
            .then(res => res.json())
            .then(cardata => {
                if (cardata.available) {
                    setIsReserved(false);
                }
                else {
                    setIsReserved(true);
                    setShowBookingModal(false);
                }
            });
    });

    const handleInfoClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleBookingClick = () => {
        if (!isReserved) {
            setShowBookingModal(true);
        }
    };

    const handleCloseBookingModal = () => {
        setShowBookingModal(false);
    };

    const handleBooking = (bookingData) => {
        console.log('Бронювання авто:', bookingData);
        fetch("http://localhost:8001/bookings/", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(bookingData)
        });
        fetch("http://localhost:8001/cars/" + car.id)
            .then((res) => res.json())
            .then(cardata => {
                console.log(cardata);
                cardata.available = false;
                fetch("http://localhost:8001/cars/" + car.id, {
                    method: "PUT",
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(cardata)
                });
            });
        setIsReserved(true);
        setShowBookingModal(false);
    };

    const handleLikeClick = () => {
        fetch("http://localhost:8001/users/" + user_id)
            .then(res => res.json())
            .then(userdata => {
                console.log(userdata.likes);
                let index = userdata.likes.indexOf(car.id);
                if (index >= 0) {
                    userdata.likes.splice(index, 1);
                }
                else {
                    userdata.likes.push(car.id);
                }
                fetch("http://localhost:8001/users/" + user_id, {
                    method: "PUT",
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(userdata)
                }).then(() => {
                    if (userdata.likes.includes(car.id)) {
                        setLikeIcon('./image/icons/heart_red_filled.png');
                        setLikeHoverIcon('./image/icons/heart_black_filled.png');
                    }
                    else {
                        setLikeIcon('./image/icons/heart_red_outline.png');
                        setLikeHoverIcon('./image/icons/heart_black_outline.png');
                    }
                });
            })
    }

    return (
        <div className='card-container'>
            <div className='card-head'>
                <h2>{car.brand} {car.model} {car.year}</h2>
            </div>
            <div className='card-content'>
                <img src={car.image} alt={car.model} />
                <div className='empty'></div>
                <CardInfo color={car.color} gearbox={car.gearbox} fuel_type={car.fuel_type} enginesize={car.enginesize} />
            </div>
            <div className='card-bottom'>
                <div className='card-price'>
                    {isReserved ? (
                        <div>
                            <h6 className='status-red'>Немає в наявності</h6>
                            <h4 className='price-disabled'>${car.price}/день</h4>
                        </div>
                    ) : (
                        <div>
                            <h6 className='status-green'>У наявності</h6>
                            <h4 className='price'>${car.price}/день</h4>
                        </div>
                    )}
                </div>
                <div className='button-panel'>
                    <button className='button-red' onClick={handleLikeClick}>
                        <div className='button-content'>
                            <div className='button-icon'>
                                <img src={like_icon} alt='' />
                                <img className='img-hover' src={like_hover_icon} alt='' />
                            </div>
                        </div>
                    </button>
                    <button className='button-yellow' onClick={handleInfoClick}>
                        <div className='button-content'>
                            <div className='button-icon'>
                                <img src={require('../image/icons/info_yellow.png')} alt='' />
                                <img className='img-hover' src={require('../image/icons/info_black.png')} alt='' />
                            </div>
                            <div className='button-label'>Інфо</div>
                        </div>
                    </button>
                    {
                        isReserved ? (
                            <button className={`button-disabled ${isReserved ? 'disabled' : ''}`} disabled={isReserved}>
                                <div className='button-content'>
                                    <div className='button-icon'>
                                        <img src={require('../image/icons/key_gray.png')} alt='' />
                                    </div>
                                    <div className='button-label'>Забронювати</div>
                                </div>
                            </button>
                        ) : (
                            <button className={`button-green ${isReserved ? 'disabled' : ''}`} onClick={handleBookingClick} disabled={isReserved}>
                                <div className='button-content'>
                                    <div className='button-icon'>
                                        <img src={require('../image/icons/key_green.png')} alt='' />
                                        <img className='img-hover' src={require('../image/icons/key_black.png')} alt='' />
                                    </div>
                                    <div className='button-label'>Забронювати</div>
                                </div>
                            </button>
                        )}
                </div>
            </div>

            <InfoModal car={car} showModal={showModal} handleClose={handleCloseModal} />
            <BookingModal
                showModal={showBookingModal}
                handleClose={handleCloseBookingModal}
                handleBooking={handleBooking}
                carId={car.id}
                carYear={car.year}
                carBrand={car.brand}
                carModel={car.model}
                carImage={car.image}
                carPrice={car.price}
                userId={user_id}
            />
        </div>
    );
}

export default Card;
