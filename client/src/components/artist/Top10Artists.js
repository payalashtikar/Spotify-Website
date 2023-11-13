import React, { useEffect, useState } from 'react';
import './song.css';

const Top10Artists = () => {
  const [data, setData] = useState([]);

  const getAllArtists = async () => {
    try {
      const response = await fetch('http://localhost:8888/artists', {
        method: 'GET',
      });
      const respData = await response.json();
      setData(respData);
    } catch (error) {
      console.error('Error fetching artists:', error.message);
    }
  };

  const calculateAverageRating = (ratings) => {
    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    return ratings.length > 0 ? totalRating / ratings.length : 0;
  };

  useEffect(() => {
    getAllArtists();
  }, []);

  // Sort artists based on average song rating in descending order
  const sortedArtists = data.sort(
    (a, b) =>
      calculateAverageRating(b.songs.flatMap((song) => song.ratings)) -
      calculateAverageRating(a.songs.flatMap((song) => song.ratings))
  );

  // Get the top 10 artists
  const top10Artists = sortedArtists.slice(0, 10);

  return (
    <div className='song-container'>
      <h1>Top 10 Artists</h1>
      <table>
        <thead>
          <tr>
            <th>Artist</th>
            <th>Date of Birth</th>
            <th>Songs</th>
            <th>Bio</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {top10Artists.map((item, id) => {
            return (
              <tr key={id}>
                <td>{item.name}</td>
                <td>
                  {new Date(item.dob).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </td>
                <td>
                  {item.songs.map((val, id) => {
                    return (
                      <ul key={id}>
                        <li>{val.name} : {calculateAverageRating(val.ratings).toFixed(1)}</li>
                        {/* <li>
                          Average Rating: {calculateAverageRating(val.ratings).toFixed(1)}
                        </li> */}
                      </ul>
                    );
                  })}
                </td>
                <td>{item.bio}</td>
                <td>{calculateAverageRating(item.songs.flatMap((song) => song.ratings)).toFixed(1)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Top10Artists;

