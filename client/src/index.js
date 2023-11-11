import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './components/home/LandingPage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/home/Home';
import AddSong from './components/song/AddSong';
import AddArtist from './components/artist/AddArtist';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    {/* <Navbar/> */}
    <Routes>
      {/* <Route path='/' element={<Navbar />} /> */}
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/homepage' element={<Home />} />
      <Route path='/addsong' element={<AddSong />} />
      <Route path='/addartist' element={<AddArtist />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
