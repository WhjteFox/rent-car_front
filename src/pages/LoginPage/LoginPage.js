import React from 'react'

export const LoginPage = () => {
   return (
      <html>
         <head>
            <title>Увійти - RentCar</title>
         </head>
         <body>
            <div className='container'>
               <div className='page'>
                  <h2>Увійти</h2>
                  <form>
                     <input required placeholder='Логін'></input>
                     <input required type='password' placeholder='Пароль'></input>
                     <button type='submit'>Вхід</button>
                  </form>
               </div>
            </div>
         </body>
      </html>
   )
}