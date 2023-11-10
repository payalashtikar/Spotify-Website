import React from 'react'
import Navbar from '../navbar/Navbar'
import GetAllSongs from '../song/GetAllSongs'

const Home = () => {
  return (
    <div>
        <Navbar />
        <GetAllSongs/>
    </div>
  )
}

export default Home