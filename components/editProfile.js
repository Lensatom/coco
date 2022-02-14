import React from 'react'
import styles from '../styles/Profile.module.css'

function EditProfile(props) {

    const profile = [
        {0: "First Name", 1: props.userData.firstName},
        {0: "Last Name", 1: props.userData.lastName},
        {0: "Other Name", 1: props.userData.otherName},
        {0: "Gender", 1: props.userData.gender},
        {0: "Date Of Birth", 1: props.userData.dob},
        {0: "Country", 1: props.userData.country},
        {0: "Organization", 1: props.userData.organization},
        {0: "Phone", 1: props.userData.phone}
    ]

    return (
        <div className={styles.editProfiles}>
            <h1> Update Profile </h1>
            {profile.map(pro => <p key={pro["0"]} className={styles.editProfile}> Edit {pro["0"]} <input placeholder={pro["1"]} className={styles.form} /> <button> Save Changes </button> </p>)}
            <button className={styles.done} onClick={props.edit}> Done </button>
        </div>
    )
}

export default EditProfile
