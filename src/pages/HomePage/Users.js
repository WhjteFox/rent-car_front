import React from "react"

export const Users = ({ database }) => {
    return (
        <div className="container">
            <div className="page">
                <table>
                    <tbody>
                        {
                            database.map((item=>(
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                </tr>
                            )))
                        } 
                    </tbody>
                </table>
            </div>
        </div>
    )
}