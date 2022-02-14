import { doc, updateDoc, getFirestore } from 'firebase/firestore'
import React from 'react'
import styles from '../styles/sideBar.module.css'

function SideBarOrg(props) {
    const firestore = getFirestore()

    let data = props.data
    const bg = {
        backgroundColor: data.color
    }
    let modeClick = 0
    const setMode = async () => {
        modeClick++
        if (modeClick == 1) {
            const orgs = doc(firestore, `orgs/${data.handle}`)
            if (data.mode == "dark") {
                await updateDoc(orgs, {mode: "light"})
            } else {
                await updateDoc(orgs, {mode: "dark"})
            }
            location.reload()
        }
        else{}
    }

    return (
        <div className={styles.bar} style={props.mode}>
            <div className={styles.header} title={data.handle}>
                <h2 className={styles.head} onClick={props.toHome} style={bg}> {data.orgName[0]} </h2>
            </div>
            <ul className={styles.navs}>
                <img className={styles.nav} src="desk.png" onClick={props.toDesk} title="Desk" alt="Desk" style={props.mode.pic} />
                <img className={styles.nav} src="info.png" onClick={props.toDetails} title="Info" alt="Info" style={props.mode.pic} />
                <img className={styles.nav} src="chat.png" onClick={props.toDetails} title="Chat" alt="Chat" style={props.mode.pic} />
                <img className={styles.nav} src="group.png" onClick={props.toDetails} title="Groups" alt="Groups" style={props.mode.pic} />
                <img className={styles.nav} src="post.png" onClick={props.toDetails} title="Posts" alt="Posts" style={props.mode.pic} />
                <img className={styles.nav} src="shelf.png" onClick={props.toDetails} title="Shelf" alt="Shelf" style={props.mode.pic} />
                <img className={styles.nav} src="pin.png" onClick={props.toDetails} title="Pinned" alt="Pinned" style={props.mode.pic} />
                <img className={styles.nav} src="notification.png" onClick={props.toDetails} title="Notifications" alt="Notifications" style={props.mode.pic} />
                <img className={styles.nav} src="organization.png" onClick={props.toDetails} title="Organizations" alt="Organizations" style={props.mode.pic} />
                <li className={styles.modeNav} onClick={setMode} title={props.modeTitle} style={props.mode.mode}></li>
            </ul>
        </div>
    )
}

export default SideBarOrg