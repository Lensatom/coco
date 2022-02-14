import React, { useState, useMemo } from 'react'
import styles from '../styles/Search.module.css'
import { initializeApp } from 'firebase/app';
import { getFirestore, query, where, updateDoc, getDocs, collection } from 'firebase/firestore'
import Loader from './loader';
import Chat from './chat';


const firebaseApp = {
    apiKey: "AIzaSyAgGHGXNAm6Z74_kSNCSaWOrte_NesgWr8",
    authDomain: "coco-db-f93a8.firebaseapp.com",
    databaseURL: "https://coco-db-f93a8-default-rtdb.firebaseio.com",
    projectId: "coco-db-f93a8",
    storageBucket: "coco-db-f93a8.appspot.com",
    messagingSenderId: "333325150232",
    appId: "1:333325150232:web:23a185c5d649792e8d3b6d",
    measurementId: "G-D0TS86S1Y5"
}

const firestore = getFirestore()


function Search( props ) {

    const [searched, setSearched] = useState("")
    const [loader, setLoader] = useState("")
    const [result, getResult] = useState([])
    const [chat, setChat] = useState()
    let data = props.data

    const fill = event => {
        setSearched(event.target.value)
    }

    const find = async event => {
        event.preventDefault()
        setLoader(<Loader />)
        if (result.length) {
            getResult([])
        }
        const allAccounts = query(
            collection(firestore, "users"),
            where( "email", "==", searched)
        )
        const accounts = await getDocs(allAccounts)
        if (accounts.empty) {
            const allAccounts = query(
                collection(firestore, "users"),
                where( "firstName", "==", searched)
            )
            const accounts = await getDocs(allAccounts)
            if (accounts.empty) {
                const allAccounts = query(
                    collection(firestore, "users"),
                    where( "lastName", "==", searched)
                )
                const accounts = await getDocs(allAccounts)
                if (accounts.empty) {
                    const allAccounts = query(
                        collection(firestore, "users"),
                        where( "handle", "==", searched)
                    )
                    const accounts = await getDocs(allAccounts)
                } else {
                    const whatever = accounts.forEach(snaps => {
                        result.push(snaps.data())
                    })
                    setLoader("") 
                }
            } else {
                const whatever = accounts.forEach(snaps => {
                    result.push(snaps.data())
                })
                setLoader("") 
            }
        } else {
            const whatever = accounts.forEach(snaps => {
                result.push(snaps.data())
            })
            setLoader("") 
        }

        if (accounts.empty) {
            const allAccountsO = query(
                collection(firestore, "orgs"),
                where( "email", "==", searched)
            )
            const accountsO = await getDocs(allAccountsO)
            const whateverO = accountsO.forEach(snaps => {
                getResult([snaps.data()])
            })
            setLoader("") 
        } 
    }
    

    let colors = ["midnightblue", "maroon", "green", "red", "blueviolet", "brown", "chocolate", "crimson", "darkolivegreen", "firebrick", "grey", "indigo", "navy", "orangered", "purple", "saddlebrown", "tomato"]
    const bg = {
        backgroundColor: colors[Math.floor(Math.random() * colors.length)]
    }
    
    if (chat) {
        return( <Chat db={[chat[0], chat[1]]} init={chat[2]} data={data} relate="new" />)
    } else if (result.length) {
        return (
            <div className={styles.page}>
                <form className={styles.form} onSubmit={find}>
                    <input type="text" placeholder="Search Anything" value={searched} onChange={fill} className={styles.input} />
                </form>
                {result.map(rlt => 
                    <div className={styles.result}>
                        
                        <div className={styles.person}>
                            <h2 className={styles.head} style={rlt}> {rlt.firstName[0]} </h2>
                            <h3> {result[0].firstName} {rlt.lastName} </h3>
                            <p> user ~ {rlt.handle} </p>
                        </div>
                        <p> {rlt.organization} </p>
                        <b> 0 followers 0 following </b>
                        <div className={styles.person}>
                            <button className={styles.button}> Follow </button>
                            <button className={`${styles.button} ${styles.butt}`} onClick={() => setChat([rlt.account, rlt.handle, "Hi"]) }> Chat </button>
                        </div>
                    </div>
                )}
                
            </div>
        )
    }  else {
        return (
            <div className={styles.page}>
                <form className={styles.form} onSubmit={find}>
                    <input type="text" placeholder="Search Anything" value={searched} onChange={fill} className={styles.input} />
                </form>
                <p className={styles.p}> Search a friend, a test code, test tags or an organization </p>
                {loader}
            </div>
        )
    }
}

export default Search
