import React from 'react'
import styles from '../styles/Dashboard.module.css'

function CNT(rpops) {

    let numbersOfQue = []
    for (let a = 1; a <= 200; a++) {
        numbersOfQue.push({0: a})
    }

    return (
        <div className={styles.CNT}>
            <h3> We Need Basic Test Details To Create This Test </h3>
            <p> Please fill the fields below respectively </p>
            <form className={styles.CNTForm}>
                <label className={styles.CNTLabel}> Test Title: </label>
                <input required className={styles.CNTInput} value={props.title} onChange={props.changeTitle}/>
                <label className={styles.CNTLabel}> Test Subtitle: </label>
                <input placeholder="If there's any" className={styles.CNTInput} value={props.title} onChange={props.changeTitle}/>
                <label className={styles.CNTLabel}> Test Description: </label>
                <input required className={styles.CNTInput} value={props.title} onChange={props.changeTitle}/>
                <label className={styles.CNTLabel}> Test Type: </label>
                <select className={styles.CNTInput} value={props.title} onChange={props.changeTitle}>
                    <option> Objective </option>
                </select>
                <label className={styles.CNTLabel}> Number Of Questions: </label>
                <select className={styles.CNTInput} value={props.title} onChange={props.changeTitle}> 
                    {numbersOfQue.map(numberOfQue => <option key={numberOfQue[0]}> {numberOfQue[0]} </option>)}
                </select>
                <label className={styles.CNTLabel}> Number Of Options: </label>
                <select className={styles.CNTInput} value={props.title} onChange={props.changeTitle}> 
                    <option> 2 </option>
                    <option> 3 </option>
                    <option> 4 </option>
                    <option> 5 </option>
                </select><br />
                <label className={styles.CNTLabel}> Test Rules And Regulations (If any): </label>
                <span className={styles.rar}>
                    <input placeholder="1" className={styles.CNTInput} value={props.title} onChange={props.changeTitle}/>
                    <input placeholder="2" className={styles.CNTInput} value={props.title} onChange={props.changeTitle}/>
                    <input placeholder="3" className={styles.CNTInput} value={props.title} onChange={props.changeTitle}/>
                    <input placeholder="4" className={styles.CNTInput} value={props.title} onChange={props.changeTitle}/>
                    <input placeholder="5" className={styles.CNTInput} value={props.title} onChange={props.changeTitle}/>
                </span>
                <button type="submit" className={styles.CNTInput}> Done </button>
            </form>
        </div>
    )
}

export default CNT
