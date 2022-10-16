import React from 'react';
import './Posts.css';
import { PostData } from '../../data/PostData';
import Post from '../post/Post';
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react';
import { getTimelinePost } from '../../actions/postAction';
import {useParams} from 'react-router-dom';
const Posts = () => {
  const dispatch = useDispatch();
  const {user} = useSelector( (state) => state.authReducer.authData);
  let {posts, loading} = useSelector( (state)=> state.postReducer);
  const params = useParams();
  useEffect(() => {
    dispatch(getTimelinePost(user._id));
    //console.log(posts);
  },[]);
  if( !posts) return "no posts";
  if(params.id) posts = posts.filter((post)=> post.userId === params.id)
  return (
    <div className="Posts">
      
        { 
           loading ? "Fetching post..." : 
           posts.map( ( post, id) => {
            // console.log(post)
                return (
                    <Post data={post} id={id}/>
                )
            })
        }
    </div>
  )
}

export default Posts;