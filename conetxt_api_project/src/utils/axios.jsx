import axios from "axios"

const instance = axios.create({
    baseUrl:"",
    withCredentials: true
})

export default instance