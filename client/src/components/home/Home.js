import React from 'react'
import Navbar from '../navbar/Navbar'
import GetAllSongs from '../song/GetAllSongs'
import GetAllArtists from '../artist/GetAllArtists'
import AddSongButton from '../buttons/AddSongButton'

const Home = () => {
  return (
    <div>
      <Navbar />
      <AddSongButton />
      <GetAllSongs />
      <GetAllArtists />
    </div>
  )
}

export default Home