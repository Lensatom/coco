import { useState, useEffect, useMemo} from 'react'
import { useRouter } from 'next/router'
import Loader from './loader'
import AnotherAccount from './anotherAccount'
import styles from '../styles/Login.module.css'
import { getFirestore, query, where, updateDoc, getDocs, collection, addDoc, doc } from 'firebase/firestore'
import Dashboard from './me'
import CreateUser from './createUser'

const firestore = getFirestore()

function Login(props) {

  const [org, setOrg] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [codec, setCodec] = useState("")
  const [loader, setLoader] = useState("")
  const [log, setLog] = useState(false)
  const [ready, setReady] = useState(false)

  const find = async () => {
    if (localStorage.email && localStorage.code) {
      const person = query(
        collection(firestore, "users"),
        where ("email", "==", localStorage.email, "&&", "code", "==", localStorage.code)
      )
      const personSnap = await getDocs(person);
      const personal = personSnap.forEach(async snap => {
        setLog(true)
      })
      if (log == false) {
        const org = query(
          collection(firestore, "orgs"),
          where ("email", "==", localStorage.email)
        )
        const orgSnap = await getDocs(org);
        const orgal = orgSnap.forEach(async snap => {
          setLog(true)
        })
      }
    }
    setReady(true)
  }
  useEffect(() => find(), [])
  
  
  const emailChange = event => {
    setEmail(event.target.value)
  }
  const passChange = event => {
    setPassword(event.target.value)
  }
  const organization = () => {
    setOrg(!org)
  }
  const dataCheck = async event => {
    
    event.preventDefault()
    setLoader(<Loader />)

    let code;
    const coding = () => {
      const codes = [["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]]
      const genCode = codes[0][Math.floor(Math.random() * codes[0].length)] + codes[1][Math.floor(Math.random() * codes[1].length)] + codes[2][Math.floor(Math.random() * codes[2].length)] + codes[0][Math.floor(Math.random() * codes[0].length)] + codes[1][Math.floor(Math.random() * codes[1].length)] + codes[2][Math.floor(Math.random() * codes[2].length)]
      const validCode = query(
          collection(firestore, "users"),
          where("code", "==", genCode)
      )
      if (validCode.length) {
          coding()
      }
      else{
          code = genCode
      }
    }
    coding()

    if (org == false) {
      const person = query(
        collection(firestore, "users"),
        where ("email", "==", email)
      )
      const personSnap = await getDocs(person);
      const personal = personSnap.forEach(async snap => {
        if (snap.data().password == password) {
          const users = doc(firestore, `users/${snap.data().handle}`)
          const coded = await updateDoc (users, {code: code})
          localStorage.setItem("email", email)
          localStorage.setItem("code", code)
          setLog(true)
        } else {
          setLoader("")
          setCodec("Information provided does not match any existing accounts")
        }
      })
    } else if (org == true) {
      const org = query(
        collection(firestore, "orgs"),
        where ("email", "==", email )
      )
      const orgSnap = await getDocs(org);
      const orgal = orgSnap.forEach(async snap => {
        if (snap.data().password == password) {
          const orgs = doc(firestore, `orgs/${snap.data().handle}`)
          const coded = await updateDoc(orgs, {code: code})
          localStorage.setItem("email", email)
          localStorage.setItem("code", code)
          setLog(true)
        }
        else {
          setLoader("")
          setCodec("Information provided does not match any existing accounts")
        }
      })
    } 
    setTimeout(() => {setCodec("")}, 4000)
  }

  if (ready == true) {
    if (log == true) {
      return <Dashboard ip={props.ip}/>
    } else if (log == false) {
      return ( 
        <div className={styles.page}>
          <title> TecT </title>
          <div className={styles.login}>
            <h2 className={styles.heading}> Login </h2>
            <form onSubmit={dataCheck} className={styles.form}>
              <label className={styles.label}> Email: </label>
              <input type="email" placeholder="someone@example.com" value={email} onChange={emailChange} className={styles.input} required/>
              <label className={styles.label}> Password: </label>
              <input type="password" placeholder="********" value={password} onChange={passChange} className={styles.input} required/> <br />
              <input type="checkbox" onChange={organization}/> This is an organization
              <button type="submit" onSubmit={dataCheck} className={styles.done}> Done </button>
            </form>
          </div>

          <div className={styles.links}>
            <button className={styles.link} onClick={props.createUser}> Create Account </button>
            <button className={styles.link}> About Us </button>
            <button className={styles.link}> Contact Us </button>
            <button className={styles.link} onClick={props.forgotPassword}> Forgot Password? </button>
          </div>

          {loader}
        </div>
      )
    }
  } else {
    return <Loader />
  }
}

export default Login