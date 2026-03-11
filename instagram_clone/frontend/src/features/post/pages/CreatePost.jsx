import React ,{useState, useRef} from 'react'
import '../style/createpost.scss'
import { usePost } from '../hooks/usePost'
import { useNavigate } from 'react-router'

const CreatePost = () => {

    const [caption, setCaption] = useState("")
    const postImageInputFileRef = useRef(null)

    const navigate = useNavigate()

    const {loading, handelCreatePost} = usePost()

    async function handelSubmit(e){
        e.preventDefault()
        const file = postImageInputFileRef.current.files[0]
        await handelCreatePost(file, caption)
        navigate('/')
    }

    if(loading){
        return(
            <main><h1>Creating Post</h1></main>
        )
    }

  return (
    <main className='create-post-page'>
        <div className="form-container">
            <h1>Create Post</h1>
            <form onSubmit={handelSubmit}>
                <label className='post-image-lable' htmlFor="postImage">Select Image</label>
                <input ref={postImageInputFileRef} hidden type="file" name='postImage' id='postImage'/>
                <input onChange={(e)=>{setCaption(e.target.value)}} type="text" name="caption" id="caption" placeholder='Enter Caption'/>
                <button className='button primary-bottom'>Create Post</button>
            </form>
        </div>

    </main>
  )
}

export default CreatePost
