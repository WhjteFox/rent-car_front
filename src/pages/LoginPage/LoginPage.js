import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
   const [username, update_username] = useState("");
   const [password, update_password] = useState("");

   const navigate = useNavigate();

   useEffect(() => {
      sessionStorage.clear();
   }, []);

   const LoginProceed = (e) => {
      e.preventDefault();
      if (validate()) {
         console.log("proceeding...");
         fetch("http://localhost:8001/users/" + username).then((res) => {
            return res.json();
         }).then((response) => {
            console.log(response);
            if (Object.keys(response).length === 0) {
               console.log("Invalid Username");
            }
            else {
               if (response.password === password) {
                  console.log("Login success. Welcome, " + username);
                  sessionStorage.setItem("username", username);
                  
                  navigate("/");
               }
               else {
                  console.log("Invalid credentials");
               }
            }
         }).catch((err) => {
            console.log("Login error:" + err.message);
         });
      }
   }

   const validate = () => {
      let result = true;
      if (username === '' || username === null) {
         result = false;
         console.log("username not entered");
      }
      if (password === '' || password === null) {
         result = false;
         console.log("password not entered");
      }
      return result;
   }

   return (
      <html>
         <head>
            <title>Увійти - RentCar</title>
         </head>
         <body>
            <div className='container'>
               <div className='page'>
                  <form onSubmit={LoginProceed}>
                     <div className='card'>
                        <div className='card-header'>
                           <h2>Увійти</h2>
                        </div>
                        <div className='card-body'>
                           <input required className='form-control' value={username} onChange={e => update_username(e.target.value)} placeholder='Логін'></input>
                           <input required className='form-control mt-3' type='password' value={password} onChange={e => update_password(e.target.value)} placeholder='Пароль'></input>
                        </div>
                        <div className='card-footer'>
                           <button className='btn btn-primary btn-lg' type='submit'>Вхід</button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </body>
      </html>
   )
}