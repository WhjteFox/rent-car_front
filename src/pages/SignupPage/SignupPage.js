import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './SignupPage.css';
export const SignupPage = () => {
   const [id, change_id] = useState("");
   const [password, change_password] = useState("");
   const access = "user";
   
   const navigate = useNavigate();
   
   const handle_submit = (e) => {
      let signup_user = {id, password, access};
      fetch("http://localhost:8001/users", {
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
         <body className='container'>
            <div className='container'>
               <div className='page'>
                  <form onSubmit={handle_submit}>
                     <div className='card' data-bs-theme='dark'>
                        <div className='card-header'>
                           <h2>Створити обліковий запис</h2>
                        </div>
                        <div className='card-body'>
                           <input required className='form-control' value={id} onChange={e=>change_id(e.target.value)} placeholder='Логін'></input>
                           <input required className='form-control mt-3' value={password} onChange={e=>change_password(e.target.value)} type='password' placeholder='Пароль'></input>
                        </div>
                        <div className='card-footer'>
                           <button className='btn btn-primary btn-lg' type='submit'>Зареєструватися</button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </body>
      </html>
   )
}
