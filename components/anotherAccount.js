import React from 'react'
import styles from '../styles/anoAcc.module.css'

function AnotherAccount() {
    return (
        <div className={styles.page}>
            <div className={styles.box}>
                <h2 className={styles.head}> This Account is Loggedin On Another Device or ERR 102 </h2>
                <p className={styles.des}> As a result of one of our strategy to prevent examination malpractice, we disallow a user account to be loggedin on multiple devices at the same time.
                    To continue, you can log out this account from the other device. 
                </p>
                <button className={styles.button}> Log me out of the other device </button>
                <button className={`${styles.button} ${styles.cancel}`}> Cancel </button>
            </div>
        </div>
    )
}

export default AnotherAccount
