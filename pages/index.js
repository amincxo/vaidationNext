
import Link from 'next/link'
import styles from '../styles/Home.module.css'


export default function Home() {

    const sighOutHandler = async () => {
        const res = await fetch("/api/auth/signout")
        const data = await res.json();
        console.log(data)
    }
  return (
    <div className={styles.container} >
        <button><Link href="/dashboard" >Dshboard</Link> </button>
        <button><Link href="/signup" >Sign Up</Link> </button>
        <button><Link href="/signin" >Sign In</Link> </button>
        <button onClick={sighOutHandler} >Log Out </button>
    </div>
  )
}
