import { useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Create.module.css'
import Loader from './loader'
import { initializeApp, setLogLevel } from 'firebase/app'
import { getFirestore, updateDoc, addDoc, collection, setDoc, doc, query, where } from 'firebase/firestore'
import Dashboard from './me'

const firebaseApp = {
    apiKey: "AIzaSyDSvZthbh3Dv_05OPwOSq95OysJtjLxCC0",
    authDomain: "tect-9a6d5.firebaseapp.com",
    projectId: "tect-9a6d5",
    storageBucket: "tect-9a6d5.appspot.com",
    messagingSenderId: "829811469850",
    appId: "1:829811469850:web:9fcb04a0011d61753d2ba3",
    measurementId: "G-N4WMVKMBLL"
}
const firestore = getFirestore()

function CreateUser( props ) {

    const [loader, setLoader] = useState("")
    const [log, setLog] = useState(false)
    const [email, setEmail] = useState("")
    const [firstName, setFirst] = useState()
    const [lastName, setLast] = useState()
    const [password, setPassword] = useState("")
    const [conPassword, setCon] = useState()
    const [codec, setCodec] = useState()

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

    const createAccount = event => {
        event.preventDefault()

        let colors = ["midnightblue", "maroon", "green", "red", "blueviolet", "brown", "chocolate", "crimson", "darkolivegreen", "firebrick", "grey", "indigo", "navy", "orangered", "purple", "saddlebrown", "tomato"]
        let color = colors[Math.floor(Math.random() * colors.length)]

        let handle = ""
        for (let z = 0; z < email.length; z++) {
            if (email[z] == ".") {
                break
            }
            else if (email[z] != "@") {
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
        else {
            const post = async () => {
                setLoader(<Loader />)
                const users = doc(firestore, `users/@${handle}`)
                let code;
                const coding = () => {
                    const codes = [["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]]
                    const genCode = codes[0][Math.floor(Math.random() * codes[0].length)] + codes[1][Math.floor(Math.random() * codes[1].length)] + codes[2][Math.floor(Math.random() * codes[2].length)] + codes[0][Math.floor(Math.random() * codes[0].length)] + codes[1][Math.floor(Math.random() * codes[1].length)] + codes[2][Math.floor(Math.random() * codes[2].length)]
                    const validCode = query(
                        collection(firestore, "users"),
                        where("code", "==", genCode)
                    )
                    if (validCode.exists) {
                        coding()
                    }
                    else{
                        code = genCode
                    }
                }
                coding()
                
                const user = {
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    otherName: "not set",
                    dob: "not set",
                    gender: "not set",
                    organization: "not set",
                    handle: `@${handle}`,
                    country: "not set",
                    phone: "not set",
                    backgroundColor: color,
                    account: "user",
                    mode: "light", 
                    code: code
                }
                await setDoc(users, user)
                localStorage.setItem("email", email)
                localStorage.setItem("code", code)
                setLog(true)    
            }
            post()
        }
        setTimeout(() => {setCodec("")}, 4000)
    }

    if (log == true){
        return <Dashboard />
    } else {
        return (
            <div className={styles.page}>
                <div className={styles.account}>
                    <h2 className={styles.heading}> Sign Up </h2>
                    <p> User Account </p>
                    <form onSubmit={createAccount} className={styles.form}>
                        <label className={styles.label}> Email: </label>
                        <input type="email" value={email} onChange={emailChange} className={styles.input} required/><br />
                        <label className={styles.label}> First Name: </label>
                        <input type="text" value={firstName} onChange={firstChange} className={styles.input} required/><br />
                        <label className={styles.label}> Last Name: </label>
                        <input type="text" value={lastName} onChange={lastChange} className={styles.input} required/><br />
                        <label className={styles.label}> Password: </label>
                        <input type="password" value={password} onChange={passwordChange} className={styles.input} required/><br />
                        <label className={styles.label}> Confirm Password: </label>
                        <input type="password" value={conPassword} onChange={conChange} className={styles.input} required/><br />
                        <div className={styles.button}>   
                            <button type="submit" onSubmit={createAccount} className={styles.button}> Done </button>
                            <u className={styles.button} onClick={props.createOrg}> Create Organization Account </u>
                        </div>
                    </form>
                </div>

                <div className={styles.description}>
                    
                    <h3> User Account Features </h3>
                    <ul className={styles.lists}>
                        <li className={styles.list}> Lets you to write an examination anywhere in the world at any time. </li>
                        <li className={styles.list}> Helps you to meet other people online, chat with them therefore, widening your exposure spectrum </li>
                        <li className={styles.list}> On a user account, you can join and/or create groups for studying, educational discussions, e.t.c </li>
                        <li className={styles.list}> Allows for you to follow organization accounts so as to get updates as quick as possible as well as user accounts enabling you to share and receive information faster </li>
                        <li className={styles.list}> Gives you a mean performance score that keeps you on track </li>
                        <li className={styles.list}> Provides numerous privacy settings enabling you to personlize your account as much as possible </li>
                    </ul>
                    <button className={styles.link} onClick={props.login}> Back </button>
                </div>
                {loader}
            </div>
        )
    }
}

export default CreateUser

