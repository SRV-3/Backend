import { useState } from 'react'
import axios from "axios"


function App() {
  const [notes, setNotes] = useState([
    {
      title:"Note",
      description:"notessss"
    },
    {
      title:"Note",
      description:"notessss"
    },
    {
      title:"Note",
      description:"notessss"
    },
    {
      title:"Note",
      description:"notessss"
    }
  ])

  axios.get('').then((res)=>{
    const notes = res.notes
  })
  
  


  return(
    <>
      <h1>hello</h1>
    </>
  )
}

export default App
