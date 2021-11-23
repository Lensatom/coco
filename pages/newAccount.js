import { useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../styles/NewAccount.module.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAVbzVOFHbh1umJ7RQ1dtI2DvzhHnF5GJ8",
    authDomain: "coco-dabda.firebaseapp.com",
    projectId: "coco-dabda",
    storageBucket: "coco-dabda.appspot.com",
    messagingSenderId: "999785564311",
    appId: "1:999785564311:web:089121734995c15b51c1d2",
    measurementId: "G-HBL34MY9G0"
};

const database = `${process.env.DB}/user`

function Account({ posts }) {
    
    const route = useRouter()

    const [coverDisplay, setDisplay] = useState("none") 
    let cover = {
        position: "absolute",
        width: "100%",
        top: "0%",
        left: "0%",
        display: coverDisplay,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)"
    }

    const [email, setEmail] = useState("")
    const [firstName, setFirst] = useState()
    const [lastName, setLast] = useState()
    const [password, setPassword] = useState("")
    const [conPassword, setCon] = useState()

    const emailChange = event => {
        setEmail(event.target.value)
    }
    const firstChange = event => {
        setFirst(event.target.value)
    }
    const lastChange = event => {
        setLast(event.target.value)
    }
    const passwordChange = event => {
        setPassword(event.target.value)
    }
    const conChange = event => {
        setCon(event.target.value)
    }


    const [codec, setCodec] = useState()

    const createAccount = event => {
        let handle = ""

        for (let z = 0; z < email.length; z++) {
            if (email[z] == ".") {
                break
            }
            else {
                handle = handle + email[z]
            }
        }

        let spec = 0;
        const special = ["[", "]", "{", "}", "'", "\"", "+", "=", "-", "_", ")", "(", "/", "?", "<", ">", ",", ".", "|", "*", "!", "@", "#", "$", "%", "^", "&", ":", ";", "\\"]
        for (let a = 0; a < special.length; a++) {
            for (let b = 0; b < password.length; b++) {
                if (special[a] == password[b]) {
                    spec = 1;
                }
            }
        }

        let num = 0
        const number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        for (let c = 0; c < number.length; c++) {
            for (let d = 0; d < password.length; d++) {
                if (number[c] == password[d]) {
                    num = 1;
                }
            }
        }
        
        let up = 0
        const upper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
        for (let e = 0; e < upper.length; e++) {
            for (let f = 0; f < password.length; f++) {
                if (upper[e] == password[f]) {
                    up = 1;
                }
            }
        }

        let low = 0
        const lower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
        for (let g = 0; g < special.length; g++) {
            for (let h = 0; h < password.length; h++) {
                if (lower[g] == password[h]) {
                    low = 1;
                }
            }
        }

        let existing = false
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].email == email) {
                existing = true;
            }
        }

        if (password.length > 0 && password.length < 8) {
            setCodec("Password must be more than 8 characters")
        }
        else if (spec == 0 && password.length > 0) {
            setCodec("Password must contain at least one special character")
        }
        else if (num == 0 && password.length > 0) {
            setCodec("Password must contain at least one numeric character")
        }
        else if (up == 0 && password.length > 0) {
            setCodec("Password must contain at least one uppercase character")
        }
        else if (low == 0 && password.length > 0) {
            setCodec("Password must contain at least one lowercase character")
        }
        else if (password != conPassword && password.length > 0) {
            setCodec("Passwords do not match")
        }
        else if (existing == true) {
            setCodec(" This Email has been used by another user ")
        }
        else {
            setDisplay("flex") 
            const res = async () => {
                await fetch(
                    database,
                    {
                        method: 'POST', 
                        body: JSON.stringify({
                            email: email, 
                            firstName: firstName, 
                            lastName: lastName,
                            otherName: "not set",
                            gender: "not set",
                            age: "not set",
                            country: "not set",
                            organization: "not set",
                            status: "active",
                            password: password,
                            handle: "@" + handle
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8'
                        }
                    }
                )

                process.env.email = email
                process.env.org = "no"

                route.push("/dashboard")
            }

            res()

            
        }
        
        setTimeout(() => {setCodec("")}, 4000)

        event.preventDefault()

    }

    
    return (
        <div className={styles.page}>
            <div style={cover}> 
                <h2> Please wait, your account is being created... </h2>
            </div>
            <h2 className={styles.heading}> Let &apos; 's create your account </h2>
            <sub className={styles.des}> Fill all forms accordingly. Password must contain at least 8 characters including uppercase letters, lowercase letters, numbers and special characters </sub> 
            <form onSubmit={createAccount} className={styles.form} method="post">
                <label> Email </label>
                <input type="email" value={email} onChange={emailChange} className={styles.input} required/>
                <label> First Name </label>
                <input type="text" value={firstName} onChange={firstChange} className={styles.input} required/>
                <label> Last Name </label>
                <input type="text" value={lastName} onChange={lastChange} className={styles.input} required/>
                <label> Password </label>
                <input type="password" value={password} onChange={passwordChange} className={styles.input} required/>
                <label> Confirm Password </label>
                <input type="password" value={conPassword} onChange={conChange} className={styles.input} required/>
                <sub className={styles.error}> {codec} </sub>
                <button type="submit" onSubmit={createAccount} className={styles.button}> <b> Done </b> </button>
            </form>
            <Link href="/orgAcc">
                <a className={styles.link}> Organization Account </a> 
            </Link>
            <sub className={styles.footer}> All rights reserved - coco powered by Lens </sub>
        </div>
    )
}

export async function getServerSideProps() {
    const response = await fetch(database)
    const data = await response.json()

    return{
        props: {
            posts: data
        }
    }
}

export default Account
