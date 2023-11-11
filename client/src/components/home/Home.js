import React from 'react'
import Navbar from '../navbar/Navbar'
import GetAllSongs from '../song/GetAllSongs'
import GetAllArtists from '../artist/GetAllArtists'

const Home = () => {
  return (
    <div>
        <Navbar />
        <GetAllSongs/>
        <GetAllArtists/>
    </div>
  )
}

export default Home