import React from 'react'
import styles from '../styles/Dashboard.module.css'

function Desk(props) {
    return (<>
        <div className={styles.desk}>
            <h3> Welcome To Desk </h3>
            <p> This is where most of your operation as an organization will be performed. Explore a bit to get familiar </p>
            <div className={styles.operations}>
                <button className={styles.operation} onClick={props.toCNT}> Create A New Test </button>
                <button className={styles.operation}> Post Something New </button>
                <button className={styles.operation}> Edit / Delete An Existing Test </button>
                <button className={styles.operation}> Moderate An Ongoing Test </button>
                <button className={styles.operation}> Check A Test Result </button>
                <button className={styles.operation}> Release A Shelved Test </button>
                <button className={styles.operation}> Compile Some Shelved Tests - Timetable </button>
                <button className={styles.operation}> Compile Some Shelved Results </button>
                <button className={styles.operation}> Set Global Restrictions </button>
                <button className={styles.operation}> File A Complaint </button>
            </div>
        </div>
        <div className={styles.tower}>
            <h3> Watch Tower </h3>
            <p> This is where you will see ongoing operations with your creations on the web </p>
            <div className={styles.watches}>
                <span className={styles.watch}> 0 Ongoing tests </span>
                <span className={styles.watch}> 0 Released tests </span>
                <span className={styles.watch}> 0 Shelved tests </span>
                <span className={styles.watch}> 0 Shelved Results </span>
                <span className={styles.watch}> 0 Finished tests </span>
            </div>
        </div>
        </>
    )
}

export default Desk