import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import styles from "../styles/EditTest.module.css"
import Loader from './loader';

function EditTest(props) {

  const firestore = getFirestore() 

  const data = props.data
  const test = props.test
  const [details, setDetails] = useState()

  const find = async () => {
    const thisTest = query(
      collection(firestore, `orgs/${data.handle}/test`),
      where("name", "==", test )
    )
    
    const theTests = await getDocs(thisTest)
    const theTest = theTests.forEach(snap => {
      setDetails(snap.data())
    })
  }
  if (data) { find() }
  
  if (details) {
    return (
      <div className={styles.page}>
        <h2> {details.name} </h2>
        <h4> {details.description} </h4>
        <p> written by: {details.author} </p>
      </div>
    )
  } else {
    return <Loader />
  }
}

export default EditTest;