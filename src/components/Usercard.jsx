import axios from 'axios';
import React from 'react'
import {BASE_URL} from '../utils/constant'
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const Usercard = ({user}) => {
  const {_id,firstName,lastName,age,gender,About,profilPic}=user;
  const dispatch = useDispatch()

  const handelSendRequest = async(status,userId)=>{
      const res = await axios.post(BASE_URL + "/request/send/" + status+"/"+userId,{},{withCredentials:true});
      dispatch(removeFeed(userId))
  }


  return (
    <>
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src= {profilPic}
          alt="photo" className='w-50 h-50' />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p className='font-bold'>{About}</p>
        <p> Age :{age} Gender: {gender}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={()=>handelSendRequest("interested",_id)}>Interested</button>
          <button className="btn btn-secondary" onClick={()=>handelSendRequest("ignored",_id)}>Ignore</button>
        </div>
      </div>
    </div>
    
    </>
  );
}

export default Usercard
