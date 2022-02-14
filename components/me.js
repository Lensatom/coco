import { useState, useEffect } from 'react'
import DashHeader from './dashHeader'
import Loader from './loader'
import { initializeApp } from 'firebase/app';
import { getFirestore, query, addDoc, getDocs, collection, where } from 'firebase/firestore'

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

function Dashboard(props) {

    const [data, setData] = useState("")
    
    useEffect(async () => {
        const person = query(
            collection(firestore, "users"),
            where ("email", "==", localStorage.email)
        )
        const personSnap = await getDocs(person);
        const personal = personSnap.forEach(async snap => {
            setData(snap.data())
        })
        if (!data.length) {
            const org = query(
                collection(firestore, "orgs"),
                where ("email", "==", localStorage.email)
            )
            const orgSnap = await getDocs(org);
            const orgal = orgSnap.forEach( snap => {
                setData(snap.data())
            })
            }
        }, [])

    if (props.load) {
        return <Loader />
    }
    if (data) {
        return (
            <>
                <title> TecT </title>
                <DashHeader data={data}/>
            </>
        )
    } else {
        return (
            <>
                <Loader />
            </>
        )
    }
}

export default Dashboard

        