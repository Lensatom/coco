import React, {useMemo, useState, useEffect} from 'react'
import styles from '../styles/Chat.module.css'
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc, updateDoc, getDoc, collection } from 'firebase/firestore'
import Loader from './loader';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDSvZthbh3Dv_05OPwOSq95OysJtjLxCC0",
    authDomain: "tect-9a6d5.firebaseapp.com",
    projectId: "tect-9a6d5",
    storageBucket: "tect-9a6d5.appspot.com",
    messagingSenderId: "829811469850",
    appId: "1:829811469850:web:9fcb04a0011d61753d2ba3",
    measurementId: "G-N4WMVKMBLL"
})

const firestore = getFirestore()

function Chat(props) {

    let data = props.data
    const user = doc(firestore, `${data.account}s/${data.handle}`)
    const recepient = doc(firestore, `${props.db[0]}s/${props.db[1]}`)
    const chatDb = [doc(user, `chat/${props.db[1]}`), doc(recepient, `chat/${data.handle}`)]
    const [message, setMessage] = useState(props.init)
    const [ready, setReady] = useState()

    const start = async () => {
        const me = await getDoc(chatDb[0])
        const you = await getDoc(chatDb[1])
        if (me.data() == null) {
            await setDoc(chatDb[0], {
                len: 0,
                person: props.db[1]
            })
            console.log("Read")
            await setDoc(chatDb[1], {
                len: 0,
                person: data.handle
            })
        }

        getChat()  
    }
    useEffect(() => {
        start()
    }, []);

    const changeMessage = event => {
        if (message != "sending") {
            setMessage(event.target.value)
        }
    }

    const send = async event => {
        event.preventDefault()
        setMessage("sending")

        const me = await getDoc(chatDb[0])
        const meLength = me.data().len
        const meMessage = {}
        meMessage[meLength] = {
            "serial": meLength,
            "message": message,
            "sender": "me"
        }
        await updateDoc(chatDb[0], meMessage)
        await updateDoc(chatDb[0], {len: meLength + 1})

        const you = await getDoc(chatDb[1])
        const youLength = you.data().len
        const youMessage = {}
        youMessage[youLength] = {
            "serial": youLength,
            "message": message,
            "sender": "you"
        }
        await updateDoc(chatDb[1], youMessage)
        await updateDoc(chatDb[1], {len: youLength + 1})

        setMessage("")
        getChat()
        
    }

    const [liveChats, setLiveChats] = useState([{"chat": ` With ${props.db[1]} `, "i": 0.5}])
    const getChat = async () => {
        const chats = await getDoc(chatDb[0])
        const chat = chats.data()
        if (chat.len > 0) {
            for (let i = 0; i < chat.len; i++) {
                liveChats[i] = {
                    "chat": chat[i]["message"],
                    "sender": chat[i]["sender"],
                    "i": i
                }
            }
        }
        setReady()
        setReady("ready")
        const box = document.getElementById("box");
        box.scrollTop = box.scrollHeight

    }

    if (props.db && ready) {
        return (
            <div className={styles.page}>
                <div className={styles.chats} id="box">
                    {liveChats.map(chat => 
                        <div key={chat["i"]} id={chat["i"]} className={`${chat["sender"]}`}> {chat["chat"]} </div>
                    )}
                </div>
                <form onSubmit={send} className={styles.form}>
                    <input className={styles.input} placeholder="Write a message here" value={message} onChange={changeMessage}/>
                    <button className={styles.button} type="submit" onSubmit={send}> Send </button>
                </form>
            </div>
        )
    } else {
        return <Loader />
    }
}

export default Chat
