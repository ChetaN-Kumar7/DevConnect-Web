import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import Usercard from '../components/Usercard'


const Feed = () => {
    const feed = useSelector(store=>store.feed)
    console.log(feed)
    const dispatch = useDispatch();
    const getFeed = async ()=>{
        try{
            if(feed) return;
            const res = await axios.get(BASE_URL + "/user/feed" ,{withCredentials:true});
            
            dispatch(addFeed(res?.data))
        }
        catch(err)
        {

        }
    }
    useEffect(()=>{
      getFeed()
    },[])

    if(!feed) return;
    if(feed.length<= 0) return <h1 className='flex justify-center my-10'>No new user found</h1>

  return (
    feed && (<div className='flex justify-center my-10'>
      <Usercard user={feed[0]}/>
    </div>)
  )
}

export default Feed
