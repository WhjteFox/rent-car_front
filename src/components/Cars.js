import React from "react";
import Card from "./Cards/Card";
import "./Cards/Card.css"

export const Cars = ({ database }) => {
    return (
        <div className="container">
            <div className="page">
                <table>
                    <tbody>
                        {
                            database.map((car) => (
                                <tr key={car.id}>
                                    <td>
                                        <div>
                                            <Card car = {car}></Card>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};