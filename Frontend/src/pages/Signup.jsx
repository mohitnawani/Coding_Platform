import React, { useState } from 'react'

const Signup = () => {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const handleSubmit= async(e)=>{
    e.preventDefault();
    console.log(name,email,password)

  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input value={name} type="text" placeholder='Enter your name' onChange={(e)=>setName(e.target.value)}></input>
      <input value={email} type="text" placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)}></input>
      <input value={password} type="text" placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)}></input>
      <button type="submit"></button>
    </form>
  )
}

export default Signup
