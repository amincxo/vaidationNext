import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function Signup() {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const router = useRouter()
    useEffect(()=> {
        fetch("/api/user").then(res => res.json()).then((data) => {
            if(data.status === "success"){
                router.replace("/dashboard")
            }
        } )
    },[])
    const signUpHandler = async () => {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {"Content-Type": "application/json"}
        })
        const data = await res.json();
        if (data.status === "success") {
            router.push('/signin')
        }
    }

  return (
    <div>
        <h3>Registration Form</h3>
        <input  placeholder='Email' type='text' value={email} onChange={e => setEmail(e.target.value)} />
        <input  placeholder='Password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={signUpHandler} >Sign Up </button>
    </div>
  )
}

export default Signup