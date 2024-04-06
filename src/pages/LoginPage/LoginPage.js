import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

export const LoginPage = () => {
   return (
      <html>
         <head>
            <title>Увійти - RentCar</title>
         </head>
         <body>
            <div className='container'>
               <div className='page'>
                  <form>
                     <div className='card'>
                        <div className='card-header'>
                           <h2>Увійти</h2>
                        </div>
                        <div className='card-body'>
                           <input required className='form-control' placeholder='Логін'></input>
                           <input required className='form-control mt-3' type='password' placeholder='Пароль'></input>
                        </div>
                        <div className='card-footer'>
                           <button className='btn btn-primary' type='submit'>Вхід</button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </body>
      </html>
   )
}