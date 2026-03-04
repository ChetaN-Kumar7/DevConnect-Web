import React, { useState } from 'react'
import Usercard from '../components/Usercard'
import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'

const EditProfile = ({user}) => {

    const [firstName,setFirstName]= useState(user.firstName)
    const [lastName,setLastName]= useState(user.lastName)
    const [age,setAge]= useState(user.age || "")
    const [gender,setGender]= useState(user.gender || "")
    const [About,setAbout]= useState(user.About)
    const [profilPic,setProfilPic]= useState(user.profilPic || "")
    const [error,setError]= useState()
    const [showToast,setShowToast]=useState(false)
    const dispatch = useDispatch()

    const saveProfile = async()=>{
        setError("")
        try{
            const res = await axios.patch(BASE_URL + "/profile/edit",{
            firstName,
            lastName,
            age,
            gender,
            About,
            profilPic,},{withCredentials:true})

          dispatch(addUser(res?.data?.data))
          setShowToast(true);
          setTimeout(()=>{
            setShowToast(false)
          },3000)
        }
        catch(err){
            setError(err.response.data)
        }
    }


  return (
    <>
    <div className='flex justify-center my-4'>
    <div>
      <fieldset className=" bg-base-200 border border-base-300 p-4 rounded-box mx-4">
        
        
        <label className="fieldset-label">First Name</label>
        <input type="text" className="input" value={firstName} onChange={(e)=> setFirstName(e.target.value)}  />
        
        <label className="fieldset-label">Last Name</label>
        <input type="text" className="input" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>

        <label className="fieldset-label">Age</label>
        <input type='number' className="input" value={age} onChange={(e)=>setAge(e.target.value)} />

        <label className="fieldset-label">Gender</label>
        <input type="text" className="input" value={gender} onChange={(e)=>setGender(e.target.value)}/>

        <fieldset className="fieldset">
            <legend className="fieldset-legend">About</legend>
            <textarea className="textarea h-24" value={About} onChange={(e)=>setAbout(e.target.value)}></textarea>
        </fieldset>

        <label className="fieldset-label">Profile Pic</label>
        <input type='text' className="input" value={profilPic} onChange={(e)=>setProfilPic(e.target.value)} />

        <p className='text-red-500'>{error}</p>
        
        <button className="btn btn-neutral mt-4" onClick={saveProfile}>Save Profile</button>
      </fieldset>
    </div>
    <Usercard user={{firstName,lastName,age,gender,About,profilPic}}/>
    </div>
    
    {showToast &&<div className="toast toast-top toast-center">
    
    <div className="alert alert-success">
      <span>Profile Save successfully.</span>
    </div>
  </div>}

    </>
    
  )
}

export default EditProfile
