import { useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/create.module.css'
import { getFirestore, setDoc, doc, updateDoc, getDoc, collection, query, where } from 'firebase/firestore'
import Loader from './loader';
import Dashboard from './me';

function CreateOrg( props ) {

    const firestore = getFirestore()

    const [loader, setLoader] = useState("")
    const [log, setLog] = useState(false)
    const [email, setEmail] = useState("")
    const [orgName, setName] = useState()
    const [motto, setMotto] = useState()
    const [password, setPassword] = useState("")
    const [conPassword, setCon] = useState()

    const emailChange = event => {
        setEmail(event.target.value)
    }
    const nameChange = event => {
        setName(event.target.value)
    }
    const mottoChange = event => {
        setMotto(event.target.value)
    }
    const passwordChange = event => {
        setPassword(event.target.value)
    }
    const conChange = event => {
        setCon(event.target.value)
    }


    const [codec, setCodec] = useState()

    const createAccount = event => {

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
        } else {
            const post = async () => {
                setLoader(<Loader />)
                let code;
                const coding = () => {
                    const codes = [["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]]
                    const genCode = codes[0][Math.floor(Math.random() * codes[0].length)] + codes[1][Math.floor(Math.random() * codes[1].length)] + codes[2][Math.floor(Math.random() * codes[2].length)] + codes[0][Math.floor(Math.random() * codes[0].length)] + codes[1][Math.floor(Math.random() * codes[1].length)] + codes[2][Math.floor(Math.random() * codes[2].length)]
                    const validCode = query(
                        collection(firestore, "orgs"),
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

                const org = {
                    email: email,
                    password: password,
                    orgName: orgName,
                    motto: motto,
                    address: "not set",
                    type: "not set",
                    description: "not set",
                    HRE: "not set",
                    organization: "not set",
                    handle: `@${handle}`,
                    country: "not set",
                    phone: "not set",
                    code: code,
                    color: color,
                    mode: "light",
                    account: "org"
                }
                const orgs = doc(firestore, `orgs/@${handle}`)
                await setDoc(orgs, org)
                localStorage.setItem("email", email)
                localStorage.setItem("code", code)
                setLog(true)        
            }
            post()
        }

        setTimeout(() => {setCodec("")}, 4000)

        event.preventDefault()

    }
        
    if (log == true){
        return <Dashboard />
    } else {
        return (
            <div className={styles.page}>
                <div className={styles.account}>
                    <h2 className={styles.heading}> Sign Up </h2>
                    <p> Organization Account </p>
                    <form onSubmit={createAccount} className={styles.form}>
                        <label className={styles.label}> Email: </label>
                        <input type="email" value={email} onChange={emailChange} className={styles.input} required/><br />
                        <label className={styles.label}> Org Name: </label>
                        <input type="text" value={orgName} onChange={nameChange} className={styles.input} required/><br />
                        <label className={styles.label}> Org Motto: </label>
                        <input type="text" value={motto} onChange={mottoChange} className={styles.input} required/><br />
                        <label className={styles.label}> Password: </label>
                        <input type="password" value={password} onChange={passwordChange} className={styles.input} required/><br />
                        <label className={styles.label}> Confirm Password: </label>
                        <input type="password" value={conPassword} onChange={conChange} className={styles.input} required/><br />
                        <div className={styles.button}>   
                            <button type="submit" onSubmit={createAccount} className={styles.button}> Done </button>
                            <u className={styles.button} onClick={props.createUser}> Create Personal Account </u>
                        </div>
                    </form>
                </div>

                <div className={styles.description}>
                    
                    <h3> Organization Account Features </h3>
                    <ul className={styles.lists}>
                        <li className={styles.list}> Create malpractice-free examinations and post awarenesses. </li>
                        <li className={styles.list}> One-person moderation: reduces the stress of moderation and helping candidates get the best of attention at the same time. </li>
                        <li className={styles.list}> Helps to keep examination data safe, secure and orderly for easy exploration and release. </li>
                        <li className={styles.list}> Places a double level security on certain session so as to ensure employee and management privacy on the organization account. </li>
                        <li className={styles.list}> Chatting and other conventional services are also very well available. </li>
                    </ul>
                    <button className={styles.link} onClick={props.login}> Back </button>
                </div>
                {loader}
            </div>
        )
    }
}

export default CreateOrg