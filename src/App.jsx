

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Body from './components/Body'
import Login from './components/Login'
import Profile from './components/Profile'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import Feed from './components/Feed'
import Connection from './components/Connection'
import Requests from './components/Requests'
import SignUp from './components/SignUp'


function App() { 


  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Body/>}>
            <Route path='/' element={<Feed/>}></Route>
            <Route path='/Login' element={<Login/>}></Route>
            <Route path='/Profile' element={<Profile/>} />
            <Route path='/connection' element={<Connection/>}></Route>
            <Route path='/requests' element={<Requests/>}></Route>
            <Route path='/SignUp' element={<SignUp/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      
    </Provider>
    </>
  )
}

export default App
