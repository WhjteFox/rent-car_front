import React from "react"

export const Cars = ({ database }) => {
    return (
        <div className="container">
            <div className="page">
                <table>
                    <tbody>
                        {
                            database.map((item=>(
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                </tr>
                            )))
                        } 
                    </tbody>
                </table>
            </div>
        </div>
    )
}