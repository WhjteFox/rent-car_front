import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './InfoModal.css';

const InfoModal = ({ car, showModal, handleClose}) => {
  return (
    <div className='info-modal'>
      <Modal className='info-modal' show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{car.brand} {car.model} {car.year}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={car.image} alt={car.model} className="img-fluid" />
          <p>
            <strong>Колір:</strong> {car.color}
          </p>
          <p>
            <strong>Марка:</strong> {car.brand}
          </p>
          <p>
            <strong>Модель:</strong> {car.model}
          </p>
          <p>
            <strong>Рік випуску автомобілю:</strong> {car.year}
          </p>
          <p>
            <strong>Ціна за день:</strong> {car.price}$
          </p>
          <p>
            <strong>Середня ціна за місяць:</strong> {car.price * 30}$
          </p>
          <p>
            <strong>Тип пального:</strong> {car.fuel_type}
          </p>
          <p>
            <strong>Коробка передач:</strong> {car.gearbox}
          </p>
          <p>
            <strong>Тип приводу:</strong> {car.wheeldrive}
          </p>
          <p>
            <strong>Об'єм двигуна:</strong> {car.enginesize}
          </p>
          <p>
            <strong>Середній росхід топлива:</strong> {car.gasoline}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрити
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InfoModal;
