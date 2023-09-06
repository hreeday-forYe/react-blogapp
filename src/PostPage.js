import {React,useContext} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import api from './api/posts';
import DataContext from './context/DataContext';
const PostPage = () => {
  const {id} = useParams();
  const {posts, setPosts} = useContext(DataContext);
  const navigate = useNavigate()
  const post = posts.find(post => (post.id).toString() === id);
  const handleDelete = async  (id) => {
    try {
      await api.delete(`/posts/${id}`)
      const postList = posts.filter(post => post.id !== id);
      setPosts(postList);
      navigate('/')
    } catch (error) {
      console.log(`Error: ${error.message}`)
      
    }
  }
  return (
    <main className='PostPage'>
      <article className='post'>
        {post && 
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.dateTime}</p>
            <p className='postBody'>{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className="editButton">Edit Post</button>
            </Link>
            <button className='deleteButton' onClick={()=>handleDelete(post.id)}>Delete</button>
          </>
        }
        {!post && 
          <>
            <h2>Post not Found</h2>
            <p>Well that's disappointing</p>
            <p>
              <Link to="/">Visit Our HomePage</Link>
            </p>
          </>
        }
      </article>
    </main>
  )
}

export default PostPage