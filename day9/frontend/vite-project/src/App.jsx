import { useEffect, useState } from 'react'
import axios from "axios"


function App() {
  const [notes, setNotes] = useState([])

  function fetchNotes(){
    axios.get('http://localhost:3000/api/notes')
    .then((res)=>{
      setNotes(res.data.notes)
    })
  }

  useEffect(()=>{
    fetchNotes()
  },[])
  
  
  function handelSubmit(e){
    e.preventDefault()
    const {title, description} = e.target.elements
    console.log(title.value, description.value)

    axios.post("http://localhost:3000/api/notes",{
      title: title.value,
      description: description.value
    }).then((res)=>{
      console.log(res);
      fetchNotes()
    })
  }
  
  function handelDeleteNote(noteId){
    // axios.delete("http://localhost:3000/api/note/"+noteId)
    // .then((res)=>{
    //   console.log(res);
      
    // })

    console.log(noteId)
  }
  


  return(
    <>
      <form className='note-create-form' onSubmit={handelSubmit}>
        <input type="text" name='title'/>
        <input type="text" name='description'/>
        <button>Submit</button>
      </form>

      <div className="notes">
        {notes.map((note)=>{
          return<div className="card">
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button onClick={handelDeleteNote(note._id)}>Delete</button>
          </div>
        })}
      </div>
    </>
  )
}

export default App
