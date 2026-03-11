import Post from '../components/Post'
import '../style/feed.scss'
import { usePost } from '../hooks/usePost'
import { useEffect } from 'react'
import Nav from '../../shared/components/Nav'

const Feed = () => {

    const { feed, handleGetFeed, loading, handelLike, handelUnlike} = usePost()

    useEffect(()=>{
        handleGetFeed()
    },[])

    if(loading || !feed){
        return(<main><h1>Feed is loading</h1></main>)
    }

  return (
    <main className='feed-page'>
        <Nav/>
        <div className='feed'>
            <div className="posts">
                {feed.map(post=>{
                    return <Post user={post.user} post={post} loading={loading} handelLike={handelLike} handelUnlike={handelUnlike}/>
                })}
            </div>
        </div>
    </main>
  )
}

export default Feed

