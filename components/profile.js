import React, {useState} from 'react'
import styles from '../styles/Profile.module.css'
import EditProfile from './editProfile'

function Profile(props) {
    const profile = [
        {0: "First Name", 1: props.userData.firstName},
        {0: "Last Name", 1: props.userData.lastName},
        {0: "Other Name", 1: props.userData.otherName},
        {0: "Email", 1: props.userData.email},
        {0: "Handle", 1: props.userData.handle},
        {0: "Gender", 1: props.userData.gender},
        {0: "Date Of Birth", 1: props.userData.dob},
        {0: "Country", 1: props.userData.country},
        {0: "Organization", 1: props.userData.organization},
        {0: "Phone", 1: props.userData.phone}
    ]

    const bg = {
        backgroundColor: props.userData.backgroundColor
    }

    const [editProfile, setEditProfile] = useState(false)
    const [changePassword, setChangePassword] = useState(false)

    const edit = () => {
        setEditProfile(!editProfile)
    }
    const change = () => {
        setChangePassword(true)
    }

    if (editProfile == true) {
        return (<EditProfile userData={props.userData} edit={edit}/>)
    } else if (changePassword == true) {
        // <ChangePassword />
    } else {
        return (
            <div className={styles.page}>
                <div className={styles.details}>
                    <div className={styles.header}> 
                        <h2 className={styles.head} onClick={props.toHome} style={bg}> {props.userData.firstName[0]} </h2>
                        <h3> {props.userData.firstName} {props.userData.lastName}&apos;s  Profile  </h3>
                        <b> 0 Following  0 followers</b> 
                    </div>
                    <div className={styles.detail}>
                        {profile.map(pro => <p key={pro["0"]}> {pro["0"]}: {pro["1"]} </p>)}
                    </div>
                    <button className={styles.edit} onClick={edit}> Edit Profile </button>
                    <button className={styles.change} onClick={change}> Change Password </button>
                </div>
                <div className={styles.stats}>
                    <div className={styles.taken}>
                        <span> Taken </span>
                        <h2> 0 </h2>
                        <span> Tests </span>
                    </div>
                    <div className={styles.applied}>
                        <span> Applied For </span>
                        <h2> 0 </h2>
                        <span> Tests </span>
                    </div>
                    <div className={styles.performance}>
                        <span> Average Performance </span>
                        <h2> 0% </h2>
                    </div>
                    <button className={styles.edit}> Reset Stats </button>
                </div>
            </div>
        )
    }
}

export default Profile
