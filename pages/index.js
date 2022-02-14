import { initializeApp } from 'firebase/app'
import { useState, useEffect} from 'react'
import CreateOrg from '../components/createOrg'
import CreateUser from '../components/createUser'
import ForgotPassword from '../components/forgotPassword'
import Login from '../components/login'

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDSvZthbh3Dv_05OPwOSq95OysJtjLxCC0",
    authDomain: "tect-9a6d5.firebaseapp.com",
    projectId: "tect-9a6d5",
    storageBucket: "tect-9a6d5.appspot.com",
    messagingSenderId: "829811469850",
    appId: "1:829811469850:web:9fcb04a0011d61753d2ba3",
    measurementId: "G-N4WMVKMBLL"
})

function Index({ ip }) {
  
  const login = () => {
    setBody(<Login forgotPassword={forgotPassword} createUser={createUser}/>)
  }
  const createOrg = () => {
    setBody(<CreateOrg forgotPassword={forgotPassword} createUser={createUser} login={login} />)
  }
  const createUser = () => {
    setBody(<CreateUser forgotPassword={forgotPassword} createOrg={createOrg} login={login} />)
  }
  const forgotPassword = () => {
    setBody(<ForgotPassword login={login} createUser={createUser}/>)
  }

  const [body, setBody] = useState(<Login forgotPassword={forgotPassword} createUser={createUser}/>)
  return (
    <>
      {body}
    </>
  )
}

export default Index