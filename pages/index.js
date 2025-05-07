
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useState , useEffect } from 'react'


export default function Home() {
    const [isLoggedIn , setIsLoggedIn] = useState(false)

    useEffect(() => {
        fetch("/api/user")
        .then(res=> res.json())
        .then(data => {
            if (data.status === "success") {
                setIsLoggedIn(true)
            }
        
        })
    },[])

    const sighOutHandler = async () => {
        const res = await fetch("/api/auth/signout")
        const data = await res.json();
        if (data.status === "success") {
            setIsLoggedIn(false)
        }
    }
  return (
    <div className={styles.container} >
        {isLoggedIn ?(
            <>
                <button><Link href="/dashboard" >Dshboard</Link> </button>
                <button onClick={sighOutHandler} >Log Out </button>
            </>
        ) : null }
        {!isLoggedIn && 
        <>
            <button><Link href="/signup" >Sign Up</Link> </button>
            <button><Link href="/signin" >Sign In</Link> </button>
        </>

        }
    </div>
  )
}
