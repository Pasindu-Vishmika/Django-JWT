import React , {useContext} from 'react'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {
  let {loginUser} = useContext(AuthContext)
  return (
    <div>
      <form onSubmit={loginUser}>
        <input type="text" id="username" name="username" placeholder='Enter Your Username'/>
        <br />
        
        <input type="password" id="password" name="password" placeholder='*******'/>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginPage
