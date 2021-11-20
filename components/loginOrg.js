import Link from 'next/link'
import { useState, useEffect} from 'react'
import { useRouter } from 'next/router'


function LoginOrg( { posts, organization } ) {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [codec, setCodec] = useState("")

  const emailChange = event => {
    setEmail(event.target.value)
  }

  const passChange = event => {
    setPassword(event.target.value)
  }

  const dataCheck = () => {

    for (let b = 0; b < posts.length; b++) {
      if (posts[b].email == email && posts[b].password == password) {
        router.push("/dashboard")
        setCodec("")
        break
      }
      else if (posts[b].email != email || posts[b].password != password) {
        setCodec("Information provided does not match any existing account")
      }
    }
    
    if (password.length > 0 && password.length < 8) {
      setCodec("Password does not look complete")
    }
  
    setTimeout(() => {setCodec("")}, 4000)

    process.env.email = email
    process.env.org = "yes"
    
    
  }

  return ( 
    <div className="loginPage">
      <div className="loginLogo">
        <span> COCO </span>
      </div>
      <div className="login">
        <h2 className="loginHead"> Login </h2>
        <form onSubmit={event => event.preventDefault()} className="loginForm">
          <label className="loginLabel"> Email </label>
          <input type="email" placeholder="someone@example.com" value={email} onChange={emailChange} className="loginInput"/>
          <label className="loginLabel"> Password </label>
          <input type="password" placeholder="********" value={password} onChange={passChange} className="loginInput"/>
          <p>
            <input type="checkbox" onChange={organization} checked/> This is an organization
          </p>
          <sub className="error"> {codec} </sub>
          <div className="account">
            <button type="submit" onClick={dataCheck} className="loginButton"> Login </button>
            <Link href="/newAccount">
              <a className="loginLink">
                <button className="cAButton"> Create Account </button>
             </a>
            </Link>
          </div>
          <Link href="">
            <a className = "fp"> Forgot Password? </a>
          </Link>
        </form>
      </div>

      <div className="loginVideo">
        <video width="70%" controls className="loginVideo">
          <source src="vid.mp4" type="video/mp4"></source>
        </video>
        <Link href="/about">
          <a className="loginLink"> 
            <button className="aUButton"> About us </button>
          </a>
        </Link>
      </div>
    </div>
  )
}


export default LoginOrg