import React, { useState } from 'react';
import CardInfo from './CardInfo.js';
import InfoModal from './InfoModal.js';
import BookingModal from './BookingModal.js';
import './Card.css';
import './CardButtonPanel.css';

const Card = ({ car }) => {
  const [showModal, setShowModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isReserved, setIsReserved] = useState(car.status === 'Reserved');

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
    setIsReserved(true);
    setShowBookingModal(false);
  };

  return (
    <div className='card-container'>
      <div className='card-head'>
        <h2>{car.brand} {car.model} {car.year}</h2>
      </div>
      <div className='card-content'>
        <img src={car.image} alt={car.model} />
        <div className='empty'></div>
        <CardInfo color={car.color} brand={car.brand} model={car.model} price={car.price} year={car.year} fuel_type={car.fuel_type} gearbox={car.gearbox} wheeldrive={car.wheeldrive} enginesize={car.enginesize} gasoline={car.gasoline} />
      </div>
      <div className='card-bottom'>
        {isReserved ? (
          <span className='status'>Заброньовано</span>
        ) : (
          <span className='price'>Від {car.price}$/день</span>
        )}
        <div className='button-panel'>
          <button className='button-red'>
            <div className='button-content'>
              <div className='button-icon'>
                <img src={require('../image/icons/heart_red_outline.png')} alt='' />
                <img className='img-hover' src={require('../image/icons/heart_black_outline.png')} alt='' />
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
          <button className={`button-green ${isReserved ? 'disabled' : ''}`} onClick={handleBookingClick} disabled={isReserved}>
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

      <InfoModal car={car} showModal={showModal} handleClose={handleCloseModal} />
      <BookingModal
        showModal={showBookingModal}
        handleClose={handleCloseBookingModal}
        handleBooking={handleBooking}
        carImage={car.image}
        carPrice={car.price}
      />
    </div>
  );
}

export default Card;
