import React, { useEffect } from 'react'
import { useState } from 'react'
import styles from '../styles/CreateTest.module.css'
import { getFirestore, query, getDocs, where, collection, updateDoc, doc, addDoc} from 'firebase/firestore'
import Loader from './loader';
import EditTest from './editTest';

const firestore = getFirestore()

function CreateTest(props) {
    
    const data = props.data

    let numbersOfQue = []
    for (let a = 1; a <= 200; a++) {
        numbersOfQue.push({0: a})
    }

    const [name, setName] = useState()
    const [author, setAuthor] = useState()
    const [des, setDes] = useState()
    const [type, setType] = useState("objective")
    const [que, setQue] = useState("1")
    const [opt, setOpt]  = useState("2")
    const [ror, setRor] = useState()
    const [loader, setLoader] = useState()

    const changeName = event => {
        setName(event.target.value)
    }
    const changeAuthor = event => {
        setAuthor(event.target.value)
    }
    const changeDes = event => {
        setDes(event.target.value)
    }
    const changeType = event => {
        setType(event.target.value)
    }
    const changeQue = event => {
        setQue(event.target.value)
    }
    const changeOpt = event => {
        setOpt(event.target.value)
    }
    const changeRor = event => {
        setRor(event.target.value)
    }
    const [ready, setReady] = useState(false)

    const [doneClick, setIt] = useState(0)
    const done = async event => {
        event.preventDefault()
        setIt(doneClick + 1)
        if ( doneClick == 1 ) {    
            setLoader(<Loader />)
            const info = {
                name: name,
                author: author,
                description: des,
                type: type,
                noQuestion: que,
                noOption: opt,
                rules: ror
            }
            const orgs = doc(firestore, `orgs/${data.handle}`)
            const org = collection(orgs, "test")
            const post = await addDoc(org, info)
            
            const thisTest = query(
                collection(firestore, `orgs/${data.handle}/test`),
                where("name", "==", name )
            )
            const theTests = await getDocs(thisTest)
            if (theTests.length) {alert("Sighted")}
        }
    }

    if (ready == true) {
        return <EditTest data={data} test={name} />
    } else {
        return (
            <div className={styles.page}>
                <h2> We Need Basic Test Details To Create This Test </h2>
                <p> Please fill the fields below respectively </p>
                <form className={styles.form} onSubmit={done}>
                    <label className={styles.label}> Test Name: </label>
                    <input required className={styles.input} value={name} onChange={changeName}/>
                    <label className={styles.label}> Test Author: </label>
                    <input required className={styles.input} value={author} onChange={changeAuthor}/>
                    <label className={styles.label}> Test Description: </label>
                    <textarea required className={styles.textarea} value={props.title} onChange={changeDes}></textarea>
                    <label className={styles.label}> Test Type: </label>
                    <select className={styles.input} value={props.title} onChange={changeType}>
                        <option> Objective </option>
                    </select>
                    <label className={styles.label}> Number Of Questions: </label>
                    <select className={styles.input} value={props.title} onChange={changeQue}> 
                        {numbersOfQue.map(numberOfQue => <option key={numberOfQue[0]}> {numberOfQue[0]} </option>)}
                    </select>
                    <label className={styles.label}> Number Of Options Per Question: </label>
                    <select className={styles.input} value={props.title} onChange={changeOpt}> 
                        <option> 2 </option>
                        <option> 3 </option>
                        <option> 4 </option>
                        <option> 5 </option>
                    </select><br />
                    <label className={styles.label}> Test Rules And Regulations (At least one): </label>
                    <textarea placeholder="Write rules and regulations here" required className={styles.textarea} value={props.title} onChange={changeRor}></textarea>
                    <button type="submit" className={styles.button} onSubmit={done}> Done </button>
                </form>
            </div>
        )
    }
}

export default CreateTest
