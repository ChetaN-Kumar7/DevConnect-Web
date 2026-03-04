import React, { useEffect } from 'react'
import {BASE_URL} from '../utils/constant'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connection = () => {
    const dispatch = useDispatch()
    const connections = useSelector((store)=> store.connection)
    const fetchConnection = async()=>{
        const res = await axios.get(BASE_URL+"/user/connections",{withCredentials:true})
        dispatch(addConnections(res?.data?.data))
        //console.log(res)
    }
    

    useEffect(()=>{
        fetchConnection()
    },[])

    if(!connections) return
    if(connections.length === 0) return <h1>No Connections found</h1>
    //console.log(connections)

  return (
    <div className=' text-center my-10'>
      <h1 className='font-bold text-2xl'>Connections</h1>
      {
        connections.map((connect)=>{
            const {firstName,lastName,age,gender,About,profilPic} = connect
            return(
            <div className='bg-base-300 m-4 p-4 flex w-1/2 mx-auto'> 
                <div>
                    <img alt='photo' className='w-20 h-20 rounded-full' src={profilPic}/>
                </div>
                <div className='text-left mx-4'>
                    <h2 className='font-bold '>{firstName + " " + lastName}</h2>
                    <p>{age +","+ gender}</p>
                    <p>{About}</p>
                </div>
                
                
            </div>
            )
        })
      }
    </div>
  )
}

export default Connection
