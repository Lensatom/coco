import styles from '../styles/Dashboard.module.css'
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import SideBarOrg from './sideBarOrg'
import Home from './home'
import Settings from './settings'
import Details from './details'
import Search from './search'
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc, updateDoc, getDoc, collection } from 'firebase/firestore'
import Desk from './desk'
import Chat from './chat'
import Login from './login'

const firestore = getFirestore()

function WorkHeader(props) {

    const data = props.data
    const [body, setBody] = useState(<Home />)
    const [out, setOut] = useState(false)
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
    
    const logOut = async () => {
        localStorage.setItem("email", "")
        localStorage.setItem("email", "")
        setOut(true)
    }
    const toHome = () => {
        setBody(<Home/>)
    }
    const toSettings = () => {
        setBody(<Settings />)
    }
    const toDetails = () => {
        setBody(<Details data={data}/>)
    }
    const toDesk = () => {
        setBody(<Desk data={data}/>)
    }
    const toSearch = event => {
        setBody(<Search data={data} toDetails={toDetails}/>)
    }

    if (!out) {
        return(
            <>
                {body}
                <div className={styles.header}>
                    <div className={styles.head}>
                        <h3 className={styles.name}> {data.orgName} </h3>
                        <p className={styles.motto}> ...{data.motto} </p>
                    </div>
                    <ul className={styles.nav}>
                        <img className={styles.list} src="home.png" onClick={toHome} title="Home" alt="Home" width="3%" />
                        <img className={styles.list} src="search.png" onClick={toSearch} title="Search" alt="Search" width="3%" />
                        <img className={styles.list} src="setting.png" onClick={toSettings} title="Settings" alt="Settings" width="3%" />
                        <img className={styles.list} src="logout.png" onClick={logOut} title="Log out" alt="Log out" width="3%" />
                    </ul>
                </div>
                <SideBarOrg 
                data={data} 
                mode={mode} 
                modeTitle={modeTitle} 
                toHome={toHome}
                toDetails={toDetails}
                toDesk={toDesk}/>
                
            </>
        )
    } else {
        return <Login />
    }
}

export default WorkHeader