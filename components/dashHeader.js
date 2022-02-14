import styles from '../styles/Dashboard.module.css'
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import WorkHeader from './workHeader'
import SideBar from './sideBar'
import Home from './home'
import Search from './search'
import Settings from './settings'
import Profile from './profile'
import { initializeApp } from 'firebase/app';
import { getFirestore, query, getDocs, where, collection, updateDoc, doc} from 'firebase/firestore'
import Loader from './loader'
import PreChat from './preChat'
import Login from './login'
import Index from '../pages'

const firestore = getFirestore()

function DashHeader(props) {
    const data = props.data
    const [body, setBody] = useState(<Home/>)
    const [out, setOut] = useState(false)
    const [greeting, setGreeting] = useState();
    if (data.mode == "dark") {
        const mode = {
            backgroundColor: "black",
            color: "white",
            pic : {
                filter: "invert(100%)"
            },
            mode: {
                backgroundColor: "white"
            }
        }
        const modeTitle ="Light Mode"
    } else if (data.mode == "light") {
        mode = {
            backgroundColor: "white",
            color: "black",
            pic: {
                filter: "invert(0%)"
            },
            mode: {
                backgroundColor: "black"
            }
        }
        modeTitle = "Dark Mode"
    }

    useEffect(() => {
        const greet = ["Hey", "Hi", "Hello", "Welcome", "Aloha", "Howdy", "Good Day", "Lovely Day"]
        const num = Math.floor(Math.random() * greet.length)
        const greeting = setGreeting(greet[num])
    }, [])
    
    const logOut = async () => {
        const person = doc(firestore, `users/${data.handle}`)
        localStorage.setItem("email", "")
        setOut(true)
    }
    const toHome = () => {
        setBody(<Home/>)
    }
    const toSettings = () => {
        setBody(<Settings />)
    }
    const toProfile = () => {
        setBody(<Profile userData={data}/>)
    }
    const toChat = () => {
        setBody (<PreChat data={data}/>)
    }
    const toSearch = event => {
        setBody(<Search data={data} toProfile={toProfile}/>)
        event.preventDefault()
    }
    
    if (out == true) {
        return <Index />
    } else if (data.account == "user") {
        return(
            <>
                {body}
                <div className={styles.header}>
                <h3 className={styles.name}> {greeting} {data.firstName} </h3>
                <ul className={styles.nav}>
                    <img className={styles.list} src="home.png" onClick={toHome} title="Home" alt="Home" width="3%" />
                    <img className={styles.list} src="search.png" onClick={toSearch} title="Search" alt="Search" width="3%" />
                    <img className={styles.list} src="setting.png" onClick={toSettings} title="Settings" alt="Settings" width="3%" />
                    <img className={styles.list} src="logout.png" onClick={logOut} title="Log out" alt="Log out" width="3%" />
                </ul>
                </div>
                <SideBar data={data} toProfile={toProfile} toHome={toHome} toChat={toChat} mode={mode} modeTitle={modeTitle}/>
            </>
        )
    } else if (data.account == "org") {
        return (
            <WorkHeader data={data}/>
        )
    } else{
        <Loader />
    }
}

export default DashHeader