import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const SignupPage = () => {
   const [id, change_id] = useState("");
   const [password, change_password] = useState("");
   
   const navigate = useNavigate();
   
   const handle_submit = (e) => {
      let signup_user = {id, password};
      fetch("http://localhost:8000/users", {
         method:"POST",
         headers:{'content-type':'application/json'},
         body: JSON.stringify(signup_user)
      }).then((res) => {
         navigate('/login');
      }).catch((err) => {
      });
   }

   return (
      <html>
         <head>
            <title>Реєстрація - RentCar</title>
         </head>
         <body>
            <div className='container'>
               <div className='page'>
                  <h2>Створити обліковий запис</h2>
                  <form onSubmit={handle_submit}>
                     <input required value={id} onChange={e=>change_id(e.target.value)} placeholder='Логін'></input>
                     <input required value={password} onChange={e=>change_password(e.target.value)} type='password' placeholder='Пароль'></input>
                     <button type='submit'>Зареєструватися</button>
                  </form>
               </div>
            </div>
         </body>
      </html>
   )
}
