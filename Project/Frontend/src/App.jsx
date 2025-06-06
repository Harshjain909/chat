import { useAuthStore } from './Store/useAuthStore.js';
import React, { useEffect } from 'react';
import Navbar from './Components/navbar';
import { Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Home from './Pages/Home';

import {Loader} from 'lucide-react'
import { Navigate } from 'react-router-dom';

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);

  if(isCheckingAuth && !authUser){  //showing loading
     return <div className='h-screen flex items-center justify-center'><Loader className='size-10 animate-spin'/></div>
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={authUser? <Home/> : <Navigate to='/login'/>} />
        <Route path='/signup' element={!authUser? <Signup/> : <Navigate to='/'/>} />
        <Route path='/login' element={!authUser? <Login/> : <Navigate to='/'/>} />
      </Routes>
    </div>
  );
}

export default App;
