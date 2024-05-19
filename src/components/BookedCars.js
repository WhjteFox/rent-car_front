import React from "react";
import BookingCard from "./Cards/BookingCard";
import "./Cards/Card.css"

export const BookedCars = ({ database, user_id }) => {
    return (
        <table>
            <tbody>
                {
                    database.map((booking) => (
                        <tr key={booking.id}>
                            <td>
                                <div>
                                    <BookingCard booking={booking} user_id={user_id}></BookingCard>
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
};