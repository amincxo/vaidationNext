import  { useState } from 'react'
import { verifyToken } from '../utils/auth';

function Dashboard({result}) {
    const [name , setName] = useState("");
    const [lastName , setLastName] = useState("");
    const [password , setPassword] = useState("");

    const submitHandler = async () => {
        const res = await fetch("/api/update-info",{
            method:"POST",
            body:JSON.stringify({name, lastName, password}),
            headers: {"Content-Type": "application/json"}
        });
        const data = await res.json()
        console.log(data)

    }

  return (
    <div>
        <h3>Dashboard</h3>
        <p>Your email is {result.email}</p>
        <h3>Complate your poofile:</h3>
        <input placeholder='Name' type='text' value={name} onChange={e => setName(e.target.value)} />
        <input placeholder='last Name' type='text' value={lastName} onChange={e => setLastName(e.target.value)} />
        <input placeholder='Password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={submitHandler} >submit</button>
    </div>
  )
}

export default Dashboard


export async function getServerSideProps(context) {
    const {token} = context.req.cookies;
    const secretKey = process.env.SECRET_KEY;
    const result = verifyToken(token, secretKey);
    if (!result) {
        return {
            redirect: {destination: "/signin", permannent: false}
        }
    }
    return {
        props: {
            result
        }
    }
}