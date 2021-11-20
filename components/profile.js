import React from 'react'
import styles from '../styles/Dashboard.module.css'

function Profile(props) {
    const profile = [
        {0: "First Name", 1: props.firstName},
        {0: "Last Name", 1: props.lastName},
        {0: "Other Name", 1: props.otherName},
        {0: "Email", 1: props.email},
        {0: "Gender", 1: props.gender},
        {0: "Age", 1: props.age},
        {0: "Country", 1: props.country},
        {0: "Organization", 1: props.organization},
        {0: "Password", 1: "*******...", 2: "Status", 3: props.status, 4: props.handle}
    ]
    return (
        <div className = {styles.profile}>
            <div> 
                <h3> My Profile  
                ~ <u> {profile[8][4] } </u> </h3>
                <var> 0 followers - following 0 </var>
            </div>
            <div className={styles.details}>
                <div className={styles.detail}>
                    {profile.map(pro => <p key={pro["0"]}> {pro["0"]}: {pro["1"]} </p>)}
                    <p> {profile[8][2]}: {profile[8][3]} </p>
                </div>
                <div className={styles.detail}>
                    {profile.map(pro => <input key={pro["0"]} placeholder = {`Change ${pro["0"]}`} className={styles.detailing} />)}
                    <button onClick={props.deleteAccount}> Delete Account </button>
                </div>
            </div>
        </div>
    )
}

export default Profile
