import React from 'react'
import styles from '../styles/Home.module.css'

function Home(props) {
    let mode = props.mode
    return (
        <div className={styles.page} style={mode}>
            <h2> Hello </h2>
        </div>
    )
}

export default Home
