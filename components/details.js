import React, {useState} from 'react'
import styles from '../styles/Profile.module.css'
import EditDetails from './editDetails'

function Details(props) {
    const profile = [
        {0: "Organization Name", 1: props.userData.orgName},
        {0: "Organization Motto", 1: props.userData.motto},
        {0: "Address", 1: props.userData.address},
        {0: "Email", 1: props.userData.email},
        {0: "Handle", 1: props.userData.handle},
        {0: "Organization Type", 1: props.userData.type},
        {0: "CEO", 1: props.userData.CEO},
        {0: "Country", 1: props.userData.country},
        {0: "Phone", 1: props.userData.phone}
    ]

    const [editDetails, setEditDetails] = useState(false)
    const [changePassword, setChangePassword] = useState(false)

    const edit = () => {
        setEditDetails(!editDetails)
    }
    const change = () => {
        setChangePassword(true)
    }

    if (editDetails == true) {
        return (<EditDetails userData={props.userData} edit={edit}/>)
    } else if (changePassword == true) {
        // <ChangePassword />
    } else {
        return (
            <div className={styles.page}>
                <div className={styles.details}>
                    <div className={styles.header}> 
                        <h2 className={styles.head} onClick={props.toHome}> {props.userData.orgName[0]} </h2>
                        <h3> {props.userData.orgName}&apos;s  Profile  </h3>
                        <b> 0 Following  0 followers</b> 
                    </div>
                    <div className={styles.detail}>
                        {profile.map(pro => <p key={pro["0"]}> {pro["0"]}: {pro["1"]} </p>)}
                    </div>
                    <button className={styles.edit} onClick={edit}> Edit Details </button>
                    <button className={styles.change} onClick={change}> Change Password </button>
                </div>
                <div className={styles.stats}>
                    <div className={styles.taken}>
                        <span> Posted </span>
                        <h2> 0 </h2>
                        <span> Awarenesses </span>
                    </div>
                    <div className={styles.applied}>
                        <span> Created </span>
                        <h2> 0 </h2>
                        <span> Tests </span>
                    </div>
                    <div className={styles.performance}>
                        <span> Shelfed </span>
                        <h2> 0 </h2>
                        <span> Tests </span>
                    </div>
                    <button className={styles.edit}> Reset Stats </button>
                </div>
            </div>
        )
    }
}

export default Details

