import React, { useState } from 'react'

export const SigninPage = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const submitHandler = async () => {
      try {
         const response = await fetch("http://ec2-13-51-6-115.eu-north-1.compute.amazonaws.com/api/signin", {
            method: "POST",
            body: JSON.stringify({username, password})
         })
         const data = await response.json();
         localStorage.setItem(data?.token);
      }
      catch (error) {
         console.error(error);
      }
   } 
  return (
   <div className='container'>
      <div className='page'>
         <form>
            <h2>Увійти</h2>
            <input onChange={ (e) => {setUsername(e.target.value)} } value={ username } type="text" placeholder='Логін'/>
            <input onChange={ (e) => {setPassword(e.target.value)} } value={ password } type="password" placeholder='Пароль'/>
            <button onClick={ submitHandler }>Вхід</button>
         </form>
      </div>
    </div>
  )
}