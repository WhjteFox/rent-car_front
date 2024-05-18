import React from "react";
import Card from "./Cards/Card";
import "./Cards/Card.css"

export const Cars = ({ database, user_id }) => {
    return (
        <table>
            <tbody>
                {
                    database.map((car) => (
                        <tr key={car.id}>
                            <td>
                                <div>
                                    <Card car={car} user_id={user_id}></Card>
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
};