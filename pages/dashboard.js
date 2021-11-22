import { useEffect, useState } from 'react'
import Link from 'next/link'
import DashHeader from '../components/dashHeader'
import Home from '../components/home'
import Profile from '../components/profile'
import Notifications from '../components/notifications'
import Desk from '../components/desk'
import Details from '../components/details'
import CNT from '../components/cNT'
import axios from 'axios'
import { useRouter } from 'next/router'

const database = "http://52.66.40.75/box_968b81541942e609e35c"

function Dashboard( { posts } ) {
    const router = useRouter()
    for (let a = 0; a < posts[0].length; a++) {
        if (posts[0][a].email == process.env.email) {
            const userData = {
                email: posts[0][a].email, 
                password: posts[0][a].password,
                firstName: posts[0][a].firstName,
                lastName: posts[0][a].lastName,
                otherName: posts[0][a].otherName,
                gender: posts[0][a].gender,
                age: posts[0][a].age,
                handle: posts[0][a].handle,
                country: posts[0][a].country,
                organization: posts[0][a].organization,
                status: posts[0][a].status,
                id: posts[0][a]._id
            }
            break
        }
    }
    for (let b = 0; b < posts[1].length; b++) {
        if (posts[1][b].email == process.env.email) {
            const orgData = {
                email: posts[1][b].email, 
                password: posts[1][b].password,
                name: posts[1][b].name,
                motto: posts[1][b].motto,
                address: posts[1][b].address,
                description: posts[1][b].description,
                type: posts[1][b].type,
                country: posts[1][b].country,
                status: posts[1][b].status,
                id: posts[1][b]._id
            }
        }
    }

    let [nav, setNav] = useState({
        home: 1,
        profile: 0,
        notifications: 0,
        table: 0,
        details: 0,
        CNT: 0
    })

    const zero = destination => {
        const keys = ["home", "profile", "notifications", "table", "details", "CNT"]
        for (let a = 0; a < keys.length; a++) {
            let key = keys[a]
            if (key == destination) {
                setNav({[key]: 1})
                break
            }
            else if (key != destination) {
                setNav({ [key]: 0})
            }
        }
    }

    const toHome = () => {
        zero("home")
    }

    const toProfile = () => {
        zero("profile")
    }

    const toNotifications = () => {
        zero("notifications")
    }

    const toTable = () => {
        zero("table")
    }

    const toDetails = () => {
        zero("details")
    }

    const toCNT = () => {
        zero("CNT")
    }

    let [body, setBody] = useState(<Home />)

    let trials = 3
    const deleteAccount = () => {
        if (confirm("Are you sure you want to delete this account? Deleting your account means you will loose all details of this account.")) {
            let pass = prompt("Write password to confirm account delete")
            if (pass == userData.password) {
                axios.delete(`${database}/${userData.id}`)
                router.push("./")
            }
            else{
                trials--
                if (trials > 0) {
                    alert(`Cannot proceed, password is incorrect. ${trials} more attempts will log you out`)
                }
                else{
                    router.push("./")
                    process.env.email = ""
                }
            }
        }
    }

    useEffect(() => {

        if (nav.home == 1) {
            setBody(<Home toHome = {toHome}/>)
        }
        else if (nav.profile == 1) {
            setBody(
                <Profile 
                    firstName={userData.firstName}
                    lastName={userData.lastName}
                    otherName={userData.otherName}
                    gender={userData.gender}
                    age={userData.age}
                    email={userData.email}
                    country={userData.country}
                    organization={userData.organization}
                    status={userData.status}
                    handle={userData.handle}
                    toProfile = {toProfile}
                    deleteAccount = {deleteAccount}
                />
            )
        }
        else if (nav.notifications == 1) {
            setBody(<Notifications toNotifications = {toNotifications}/>)
        }
        else if (nav.table == 1) {
            setBody(<Desk toTable = {toTable} toCNT = {toCNT}/>)
        }
        else if (nav.details == 1) {
            setBody(<Details toDetails = {toDetails}/>)
        }
        else if (nav.CNT == 1) {
            setBody(<CNT />)
        }
        
    }, [nav])

    if (process.env.email&& process.env.org == "no") {
        return (
            <>
                <DashHeader 
                    toHome = {toHome}
                    toProfile = {toProfile}
                    toNotifications = {toNotifications}
                    user = {userData.firstName}
                />
                {body}
            </>
        )
    }
    else if (process.env.email && process.env.org == "yes") {
        return (
            <>
                <DashHeader 
                    toHome = {toHome}
                    toProfile = {toProfile}
                    toNotifications = {toNotifications}
                    toTable = {toTable}
                    toDetails = {toDetails}
                    user = {orgData.name}
                    motto = {orgData.motto}
                />
                {body}
            </>
        )
    }
    else{
        return( 
            <center>
                <p> Error occured - 
                    <Link href="./"> 
                        <a>
                            <button> Log out </button>
                        </a> 
                    </Link>-
                </p> 
                <mark> For enquiry purposes, error code is 101 </mark> 
            </center> 
        )
    }
}

export async function getServerSideProps() {
    const userRes = await fetch("http://52.66.40.75/box_968b81541942e609e35c/user")
    const userData = await userRes.json()

    const orgRes = await fetch("http://52.66.40.75/box_968b81541942e609e35c/org")
    const orgData = await orgRes.json()

    return{
        props: {
            posts: [userData, orgData]
        }
    }
}

export default Dashboard
