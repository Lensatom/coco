import React, { useEffect, useState } from 'react'
import styles from '../styles/Loader.module.css'

function Loader() {
    
    return (
        <div className={styles.load}>
            <title> TecT - Loading... </title>
            <img src="Rhombus.gif" alt="Loading" className={styles.leader}/>
            <p className='styles.text'> Please wait </p>
        </div>
    )
}

export default Loader
