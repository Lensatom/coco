import { updateDoc, doc, getFirestore } from 'firebase/firestore'
import React from 'react'
import styles from '../styles/sideBar.module.css'

function SideBar(props) {
    const firestore = getFirestore()

    const data = props.data
    const bg = {
        backgroundColor: data.backgroundColor
    }

    let modeClick = 0
    const setMode = async () => {
        modeClick++
        if (modeClick == 1) {
            const users = doc(firestore, `users/${data.handle}`)
            if (data.mode == "dark") {
                await updateDoc(users, {mode: "light"})
            } else {
                await updateDoc(users, {mode: "dark"})
            }
            location.reload()
        }
        else{}
    }

    return (
        <div className = {styles.bar} style={props.mode}>
            <div className={styles.header}>
                <h2 className={styles.head} onClick={props.toHome} style={bg} title={data.handle}> {data.firstName[0]} </h2>
            </div>
            <ul className={styles.navs}>
                <img className={styles.nav} src="profile.png" onClick={props.toProfile} title="Profile" alt="Profile" style={props.mode.pic} />
                <img className={styles.nav} src="chat.png" onClick={props.tochats} title="Chats" alt="Chats" style={props.mode.pic} />
                <img className={styles.nav} src="group.png" onClick={props.toGroups} title="Groups" alt="Groups" style={props.mode.pic} />
                <img className={styles.nav} src="calendar.png" onClick={props.toUpcomings} title="Upcomings" alt="Upcomigs" style={props.mode.pic} />
                <img className={styles.nav} src="pin.png" onClick={props.toPinned} title="Pinned" alt="Pinned" style={props.mode.pic} />
                <img className={styles.nav} src="notification.png" onClick={props.toNotifications} title="Notifications" alt="Notifications" style={props.mode.pic} />
                <img className={styles.nav} src="organization.png" onClick={props.toOrganizations} title="Organizations" alt="Organizations" style={props.mode.pic} />
                <li className={styles.modeNav} style={props.mode.mode} onClick={setMode} title={props.modeTitle}></li>
            </ul>
        </div>
    )
}

export default SideBar