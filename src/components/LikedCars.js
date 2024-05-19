import React from "react";
import LikeCard from "./Cards/LikeCard";
import "./Cards/Card.css"

export const LikedCars = ({ database, user_id }) => {
    return (
        <table>
            <tbody>
                {
                    database.map((car) => (
                        <tr key={car.id}>
                            <td>
                                <div>
                                    <LikeCard car={car} user_id={user_id}></LikeCard>
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
};