import React, { useMemo, useState } from 'react'
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc, updateDoc, getDoc, collection, getDocs, query, where } from 'firebase/firestore'
import Loader from './loader'
import Chat from './chat';
import styles from '../styles/PreChat.module.css'

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

function PreChat(props) {
    let data = props.data
    const [people, getPeople] = useState([])
    const user = doc(firestore, `${data.account}s/${data.handle}`)
    const [chat, setChat] = useState()

    const display = async () => {
        const snapshots = query(
            collection(user, "chat"),
            where("account", "==", "user")
        )
        const snapshot = await getDocs(snapshots)
        const snaps = snapshot.forEach(async snap => {
            const chatters = doc(firestore, `${snap.data().account}s/${snap.data().person}`)
            const chatter = await getDoc(chatters)
            const chat = chatter.data()
            people.push(chat)
        })
    }
    useMemo(() => {display()})

    if (chat) {
        return( <Chat db={[chat[0], chat[1]]} init={chat[2]} data={data} relate="known" />)
    } else if (people.length) {
        return (
            <div className={styles.page}>
                {people.map(person => {
                    <div className={styles.chat} onClick={() => setChat([rlt.account, rlt.handle, ""]) }>
                        <h2 className={styles.head}> {person.firstName[0]} </h2>
                        <h3> {person.firstName} {person.lastName} </h3>
                        <p> ~{person.handle} </p>
                    </div>
                })}
            </div>
        )
    } else {
        return <Loader />
    }
}

export default PreChat
