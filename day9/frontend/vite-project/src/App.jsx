import { useEffect, useState } from 'react'
import axios from "axios"


function App() {
  // const [editDiv, setEditDiv] = useState(false)
  const [notes, setNotes] = useState([])
  const [noteId, setNoteId] = useState()
  const [editNote, setEditNote] = useState({
    title:'',
    description:''
  })

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
    let r = Math.floor(Math.random()*256)
    let g = Math.floor(Math.random()*256)
    let b = Math.floor(Math.random()*256)
    const {title, description} = e.target.elements

    axios.post("http://localhost:3000/api/notes",{
      title: title.value,
      description: description.value,
      color:{
        r:r,
        g:g,
        b:b,
      }
    }).then((res)=>{
      console.log(res);
      fetchNotes()
    }) 
  }
  
  function handelDeleteNote(noteId){
    axios.delete("http://localhost:3000/api/note/"+noteId)
    .then(()=>{
      fetchNotes()
    })
    
  }
  
  function handelEditSubmit(e, id){
    e.preventDefault(e)
    
    const {title,description} = e.target.elements

    axios.patch('http://localhost:3000/api/note/'+id,{
      title:title.value,
      description:description.value,
    })
    .then((res)=>{
      console.log(res);
      fetchNotes()
    })

  }



  function handelEditDiv(note){
    setNoteId(note._id)
    setEditNote({
      title:note.title,
      description:note.description
    })

    if(noteId){
      setNoteId()
    }
  }

  

  return(
    <>
      <h2>CREATE NOTE</h2>

      <form className='note-create-form' onSubmit={handelSubmit}>
        <input type="text" name='title' placeholder='Enter Title'/>
        <input type="text" name='description'placeholder='Enter Description'/>
        <button>Submit</button>
      </form>

      <h2>ALL NOTES</h2>

      <div className="notes">
        {notes.map((note)=>{
          return<div className="card" style={{backgroundColor:`rgb(${note.color.r},${note.color.g},${note.color.b})`}}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <form className={`note-edit-form ${note._id===noteId?'active':'inactive'}`} onSubmit={(e)=>handelEditSubmit(e, note._id)}>
              <input type="text" value={editNote.title} name='title' placeholder='Enter Title' onChange={(e)=>{
                setEditNote({...editNote, title: e.target.valu })
              }}/>
              <input type="text" value={editNote.description} name='description'placeholder='Enter Description' onChange={(e)=>{
                setEditNote({...editNote, description: e.target.value}) 
              }}/>
              <button onClick={()=>handelEditDiv(note._id)}>UPDATE</button>
            </form>
            <button onClick={()=>handelDeleteNote(note._id)}>Delete</button>
            <button onClick={()=>handelEditDiv(note)}>Edit</button>
          </div>
        })}
      </div>
    </>
  )
}

export default App
