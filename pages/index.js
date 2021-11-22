import Link from 'next/link'
import { useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import LoginUser from '../components/loginUser'
import LoginOrg from '../components/loginOrg'


function Login( { posts } ) {

  const [isOrganization, setOrg] = useState(0)

  const organization = () => {
    setOrg(isOrganization + 1)
  }

  const [body, setBody] = useState(<LoginUser organization={organization} posts={posts}/>)

  useEffect(() => {
    if (isOrganization % 2 == 0) {
      setBody(<LoginUser organization={organization} posts={posts[0]}/>)
    }
    else if (isOrganization % 2 == 1) {
      setBody(<LoginOrg organization={organization} posts={posts[1]}/>)
    }
  }, [isOrganization])

  return body
}

export async function getStaticProps() {
  const userRes = await fetch("http://52.66.40.75/box_968b81541942e609e35c/user")
  const userData = await userRes.json()

  const orgRes = await fetch("http://52.66.40.75/box_968b81541942e609e35c/org")
  const orgData = await orgRes.json()

  return{
    props: {
      posts: [userData, orgData]
    },
    revalidate: 60
  }
}
  
export default Login
