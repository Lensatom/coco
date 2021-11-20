import Link from 'next/link'
import styles from '../styles/Dashboard.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

function DashHeader(props) {

    const router = useRouter()

    const [greeting, setGreeting] = useState();
    useEffect(() => {
        const greet = ["Hey", "Hi", "Hello", "Welcome", "Aloha", "Howdy", "Good Day", "Lovely Day"]
        const num = Math.floor(Math.random() * greet.length)
        const greeting = setGreeting(greet[num])
    }, [greeting])

    const logOut = () => {
        process.env.email = ""
        setTimeout(() => {router.push("./")}, 1000)
    }

    if (process.env.org == "no") {
        return(
            <div className={styles.header}>
                <h3 className={styles.name}> {greeting} {props.user} </h3>
                <ul className={styles.nav}>
                    <li onClick={props.toHome} className={styles.list}> Home </li>
                    <li onClick={props.toProfile} className={styles.list}> Profile <sup>  </sup> </li>
                    <li onClick={props.toNotifications} className={styles.list}> Notifications <sup>  </sup> </li>
                    <li className={styles.list}> <input type="text" placeholder="Search a test code"/> </li>
                    <li className={styles.list} onClick = {logOut}> Log-out </li>
                </ul>
            </div>
        )
    }
    else if (process.env.org == "yes") {
        return (
            <div className={styles.header}>
                <div>
                    <h3 className={styles.name}> {props.user} </h3>
                    <span className={styles.motto}> {props.motto} </span>
                </div>
                <ul className={styles.nav}>
                    <li onClick={props.toHome} className={styles.list}> Home </li>
                    <li onClick={props.toTable} className={styles.list}> Desk </li>
                    <li onClick={props.toDetails} className={styles.list}> Details <sup>  </sup> </li>
                    <li onClick={props.toNotifications} className={styles.list}> Notifications <sup>  </sup> </li>
                    <li className={styles.list}> <input type="text" placeholder="Search a test code"/> </li>
                    <li className={styles.list} onClick = {logOut}> Log-out </li>
                </ul>
            </div>
        )
    }
}

export default DashHeader