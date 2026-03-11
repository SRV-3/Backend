import { useContext } from 'react'
import { AuthContext } from '../auth.context.jsx'
import { register,login,getMe } from "../services/auth.api";

export function useAuth() {

    const context = useContext(AuthContext)
    const {user, setUser, loading, setLoading} = context

    const handelLogin = async(username, password)=>{
        setLoading(true)
        try {
            const response = await login(username, password)
            setUser(response.user)
        } catch (error) {
            console.log(err)
        } finally{
            setLoading(false)
        }
    }

    const handelRegister = async(username,email,password)=>{

        setLoading(true)
        try {
            const response = await register(username,email,password)
            setUser(response.user)
        } catch (error) {
            console.log(err)
        } finally{
            setLoading(false)
        }
    }

    return {
        user, loading, handelLogin, handelRegister
    }

}