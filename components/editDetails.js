import React from 'react'
import styles from '../styles/Profile.module.css'

function EditDetails(props) {
    const details = [
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

    return (
        <div className={styles.editProfiles}>
            <h1> Update Profile </h1>
            {details.map(det => <p key={det["0"]} className={styles.editProfile}> Edit {det["0"]} <input placeholder={det["1"]} className={styles.form} /> <button> Save Changes </button> </p>)}
            <button className={styles.done} onClick={props.edit}> Done </button>
        </div>
    )
}

export default EditDetails
