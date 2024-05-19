import React from 'react';
import { Modal } from 'react-bootstrap';
import './InfoModal.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

const InfoModal = ({ car, showModal, handleClose }) => {
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
                        <strong>Рік випуску автомобіля:</strong> {car.year}
                    </p>
                    <p>
                        <strong>Ціна за день:</strong> {car.price}$
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
                        <strong>Об'єм двигуна:</strong> {car.enginesize} л
                    </p>
                    <p>
                        <strong>Середня витрата палива:</strong> {car.gasoline}
                    </p>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default InfoModal;
