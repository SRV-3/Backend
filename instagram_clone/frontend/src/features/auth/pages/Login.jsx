import axios from 'axios'
import '../style/form.scss'
import { Link } from 'react-router'
import { useState } from 'react'

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function handelSubmit(e){
        e.preventDefault()

        axios.post("http://localhost:3000/api/auth/login",{
            username,
            password
        },{
            withCredentials:true
        })
        .then(res=>{
            console.log(res.data)
        })
    }

  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handelSubmit}> 
                <input
                 onInput={(e)=>{setUsername(e.target.value)}}
                 type="text" 
                 name='username' 
                 placeholder='Enter Username'/>
                
                <input
                 onInput={(e)=>{setPassword(e.target.value)}}
                 type="password"
                 name='password' 
                 placeholder='Enter Password' />

                <button>LOGIN</button>
            </form>
            <p>Create new account <Link to='/register' className='toggleAuthForm'>Register</Link> </p>
        </div>
    </main>
  )
}

export default Login
