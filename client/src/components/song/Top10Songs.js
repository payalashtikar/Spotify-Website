

import React, { useEffect, useState } from 'react';
import './song.css';
import Navbar from '../navbar/Navbar';

const TopSongs = () => {
  const [topSongs, setTopSongs] = useState([]);

  const getTopSongs = async () => {
    try {
      const response = await fetch('http://localhost:8888/songs', {
        method: 'GET',
      });

      const respData = await response.json();

      // Sort songs based on average rating in descending order
      const sortedSongs = respData.sort(
        (a, b) =>
          calculateAverageRating(b.ratings) - calculateAverageRating(a.ratings)
      );

      // Get the top 10 songs
      const top10Songs = sortedSongs.slice(0, 10);

      setTopSongs(top10Songs);
    } catch (error) {
      console.error('Error fetching songs:', error.message);
    }
  };

  const calculateAverageRating = (ratings) => {
    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    return ratings.length > 0 ? totalRating / ratings.length : 0;
  };

  useEffect(() => {
    getTopSongs();
  }, []);

  return (
    <>
      <Navbar />
      <div className='song-container'>
        <h1>Top 10 Songs</h1>
        <table>
          <thead>
            <tr>
              <th>Cover</th>
              <th>Song</th>
              <th>Date of Release</th>
              <th>Artist</th>
              <th>Average Rating</th>
            </tr>
          </thead>
          <tbody>
            {topSongs.map((song, id) => (
              <tr key={id}>
                <td>
                  <img width='50px' src={song.coverImage} alt='' />
                </td>
                <td>{song.name}</td>
                <td>
                  {new Date(song.dateOfRelease).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </td>
                <td>{song.artist.map((artist, id) => artist.name).join(' , ')}</td>
                <td>{calculateAverageRating(song.ratings).toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TopSongs;


