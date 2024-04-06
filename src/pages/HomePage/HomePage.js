import React, { useEffect, useState } from "react"
import { Users } from "./Users"

export const HomePage = () => {
    const[data, change_data] = useState(null);
    useEffect(() => {

        fetch("http://localhost:8000/users").then(res => {
            return res.json();
        }).then(result => {
            change_data(result);
        })

    }, [])
    return (
        <html>
            <head>
                <title>Головна - RentCar</title>
            </head>
            <body>
                <div className="container">
                    <div className="page">
                        <h2>Головна</h2>
                        <h3>Зареєстровані користувачі</h3>
                        <div className="container">
                            {data && <Users database={data}></Users>}
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}
