// InfoModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './InfoModal.css';
const InfoModal = ({ car, showModal, handleClose }) => {
  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton className="brand-info">
        <Modal.Title className="text-dark">{car.brand} {car.model} {car.year}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="gray-lighter">
        <img src={car.image} alt={car.model} className="img-fluid rounded" />
        <p className="text-dark">
          <strong>Колір:</strong> {car.color}
        </p>
        <p className="text-dark">
          <strong>Марка:</strong> {car.brand}
        </p>
        <p className="text-dark">
          <strong>Модель:</strong> {car.model}
        </p>
        <p className="text-dark">
          <strong>Рік випуску автомобілю:</strong> {car.year}
        </p>
        <p className="text-dark">
          <strong>Орієнтовна ціна за день:</strong> {car.price}$
        </p>
        <p className="text-dark">
          <strong>Середня ціна за місяць:</strong> {car.price * 30}$
        </p>
        <p className="text-dark">
          <strong>Тип пального:</strong> {car.fuel_type}
        </p>
        <p className="text-dark">
          <strong>Коробка передач:</strong> {car.gearbox}
        </p>
        <p className="text-dark">
          <strong>Тип приводу:</strong> {car.wheeldrive}
        </p>
        <p className="text-dark">
          <strong>Об'єм двигуна:</strong> {car.enginesize}
        </p>
        <p className="text-dark">
          <strong>Середній росхід топлива:</strong> {car.gasoline}
        </p>
      </Modal.Body>
      <Modal.Footer className="brand-success">
        <Button variant="secondary" onClick={handleClose}>
          Закрити
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InfoModal;
