import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './BookingModal.css';
import streetsData from '../../db/database.json';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import uk from 'date-fns/locale/uk';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('uk', uk);

const BookingModal = ({ showModal, handleClose, handleBooking, carId, carImage, carPrice, userId, isReserved }) => {
    const [formData, setFormData] = useState({
        id: "",
        car: carId,
        user: userId,
        totalPrice: 0,
        pickUpLocation: '',
        returnLocation: '',
        additionalComments: '',
        pickUpDate: new Date(),
        returnDate: new Date(),
    });

    const [suggestions, setSuggestions] = useState([]);
    const [returnSuggestions, setReturnSuggestions] = useState([]);
    const [totalCost, setTotalCost] = useState(0);

    const handleDateChange = (date, field) => {
        setFormData({
            ...formData,
            [field]: date,
        });
    };

    useEffect(() => {
        const { pickUpDate, returnDate } = formData;
        const timeDiff = returnDate.getTime() - pickUpDate.getTime();
        let daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        setTotalCost(daysDiff * carPrice);
    }, [formData, carPrice]);

    const handleInputChange = (e, locationType) => {
        const inputLocation = e.target.value;
        setFormData({
            ...formData,
            [locationType]: inputLocation,
        });

        const filteredSuggestions =
            inputLocation.trim() !== ''
                ? streetsData.streets
                    .map((street) => street.location)
                    .filter((location) => location.toLowerCase().includes(inputLocation.toLowerCase()))
                    .slice(0, 5)
                : [];

        if (locationType === 'pickUpLocation') {
            setSuggestions(filteredSuggestions);
        } else if (locationType === 'returnLocation') {
            setReturnSuggestions(filteredSuggestions);
        }
    };

    const handleSuggestionClick = (suggestion, locationType) => {
        setFormData({
            ...formData,
            [locationType]: suggestion,
        });

        if (locationType === 'pickUpLocation') {
            setSuggestions([]);
        } else if (locationType === 'returnLocation') {
            setReturnSuggestions([]);
        }
    };

    const handleSubmit = () => {
        const { pickUpDate, returnDate } = formData;
        const timeDiff = returnDate.getTime() - pickUpDate.getTime();
        let daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        let date = new Date();
        console.log(daysDiff);
        console.log(carPrice);
        console.log(timeDiff);
        handleBooking({
            ...formData,
            id: userId + carId + date.getTime(),
            totalPrice: daysDiff * carPrice
        });
        handleClose();
    };

    return (
        <div className='booking-modal'>
            <Modal className='info-modal' show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Бронювання автомобілю</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId='pickUpLocation'>
                            <Form.Label>Місце отримання авто</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Введіть місце отримання авто'
                                name='pickUpLocation'
                                value={formData.pickUpLocation}
                                onChange={(e) => handleInputChange(e, 'pickUpLocation')}
                                className='form-control'
                                disabled={isReserved}
                            />
                            <ul className='list-unstyled'>
                                {suggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion, 'pickUpLocation')}
                                        className='list-group-item'
                                    >
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        </Form.Group>
                        <Form.Group controlId='returnLocation'>
                            <Form.Label>Місце повернення авто</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Введіть місце повернення авто'
                                name='returnLocation'
                                value={formData.returnLocation}
                                onChange={(e) => handleInputChange(e, 'returnLocation')}
                                className='form-control'
                            />
                            <ul className='list-unstyled'>
                                {returnSuggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion, 'returnLocation')}
                                        className='list-group-item'
                                    >
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        </Form.Group>
                        <Form.Group controlId='additionalComments'>
                            <Form.Label>Додаткові коментарі</Form.Label>
                            <Form.Control
                                as='textarea'
                                rows={3}
                                placeholder='Введіть додаткові коментарі'
                                name='additionalComments'
                                value={formData.additionalComments}
                                onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
                                className='form-control'
                            />
                        </Form.Group>
                        <Form.Group controlId='pickUpDate'>
                            <Form.Label>Дата та час отримання авто</Form.Label>
                            <DatePicker
                                selected={formData.pickUpDate}
                                onChange={(date) => handleDateChange(date, 'pickUpDate')}
                                showTimeSelect
                                dateFormat='dd.MM.yyyy HH:mm'
                                locale='uk'
                                calendarClassName='responsive-calendar'
                                todayButton='Сьогодні'
                                timeCaption='Час'
                                className='form-control'
                            />
                        </Form.Group>
                        <Form.Group controlId='returnDate'>
                            <Form.Label>Дата та час повернення авто</Form.Label>
                            <DatePicker
                                selected={formData.returnDate}
                                onChange={(date) => handleDateChange(date, 'returnDate')}
                                showTimeSelect
                                dateFormat='dd.MM.yyyy HH:mm'
                                locale='uk'
                                calendarClassName='responsive-calendar'
                                todayButton='Сьогодні'
                                timeCaption='Час'
                                className='form-control'
                            />
                        </Form.Group>

                        <div>
                            <img src={carImage} alt='Car' className='img-fluid' />
                        </div>
                        <Form.Group controlId='totalCost'>
                            <Form.Label>Загальна вартість оренди:</Form.Label>
                            <Form.Control type='text' value={`$${totalCost}`} readOnly />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={handleSubmit} disabled={isReserved}>
                        Забронювати
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BookingModal;