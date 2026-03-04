import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestsSlice'

const Requests = () => {
    const dispatch = useDispatch()
    const requests = useSelector((store)=>store.requests)
    //console.log(requests)

    const reviewRequest = async (status,_id) =>{
      try{
        const res = await axios.post(BASE_URL +"/request/review/"+status+"/"+_id,{},{withCredentials:true})

        dispatch(removeRequest(_id))
      }
      catch(err)
      {

      }
    }

    const fetchRequest = async()=>{
        const res = await axios.get(BASE_URL +"/user/requests/received",{withCredentials:true})
        dispatch(addRequest(res.data.data))
    }
    useEffect(()=>{
        fetchRequest();
    },[])
    if(!requests) return
    if(requests.length === 0) return <h1>No Request found</h1>
    

  return (
    <div className=' text-center my-10'>
      <h1 className='font-bold text-2xl'>Requests</h1>
      {
        requests.map((req)=>{
            const {firstName,lastName,age,gender,About,profilPic} = req.fromUserId
            return(
            <div className='bg-base-300 m-4 p-4 flex justify-between items-center w-1/2 mx-auto'> 
                <div>
                    <img alt='photo' className='w-20 h-20 rounded-full' src={profilPic}/>
                </div>
                <div className='text-left mx-4'>
                    <h2 className='font-bold '>{firstName + " " + lastName}</h2>
                    <p>{age +","+ gender}</p>
                    <p>{About}</p>
                </div>
                <div>
                  <button className="btn btn-outline btn-primary mx-2" onClick={()=>reviewRequest("rejected",req._id)}>Reject</button>
                  <button className="btn btn-outline btn-secondary mx-2" onClick={()=>reviewRequest("accepted",req._id)}>Accept</button>
                </div>
                
            </div>
            )
        })
      }
    </div>
  )
}

export default Requests
