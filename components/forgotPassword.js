import React from 'react'
import styles from '../styles/ForgotPassword.module.css'

function ForgotPassword( props ) {
    return (
        <div className={styles.page}>
            <div className={styles.auth}>
                <h2 className={styles.heading}> Reset Password </h2>
                <span> Two-step authentication </span>
                <ol className={styles.resets}>
                    <li className={styles.reset}>
                        <span> Enter the email address you used to sign up </span>
                        <form className={styles.form}>
                            <label> Email: </label>
                            <input type="email" required className={styles.input} />
                        </form>
                    </li>
                    <li className={styles.reset}>
                        <span> Enter the code that has been sent to your mail </span>
                        <form className={styles.form}>
                            <label> Code: </label>
                            <input type="text" required className={styles.input} />
                        </form>
                    </li>
                </ol>
            </div>

            <div className={styles.links}>
                <button className={styles.link} onClick={props.createUser}> Create Account </button>
                <button className={styles.link}> About Us </button>
                <button className={styles.link}> Contact Us </button>
                <button className={styles.link} onClick={props.login}> Back </button>
            </div>
        </div>
    )
}

export default ForgotPassword
