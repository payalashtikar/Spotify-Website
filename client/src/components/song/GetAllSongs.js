import React, { useState, useEffect } from 'react'
import './song.css'
const GetAllSongs = () => {
    const [data, setData] = useState([])
    const [avgRating, setAvgRating] = useState({});

    const getAllSongs = async () => {
        try {
            const response = await fetch("http://localhost:8888/songs", {
                method: "GET"
            })
            const respData = await response.json();

            // calculating average rating for each song
            const averageRatings = respData.reduce((acc, song) => {
                const ratings = song.ratings.map((rating) => rating.rating);
                const averageRating = ratings.length > 0 ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : 0;
                console.log(`Song: ${song.name}, Average Rating: ${averageRating.toFixed(1)}`);
                acc[song._id] = averageRating;
                return acc;
            }, {});


            console.log(respData)
            console.log(respData.artists)
            setData(respData)
            setAvgRating(averageRatings)
        }
        catch (error) {
            console.error('Error fetching songs', error.message)
        }
    }

    useEffect(() => {
        getAllSongs()
    }, [])

    const StarRating = ({ rating, onRatingClick, songId }) => {
        const [clickedStarIndex, setClickedStarIndex] = useState(0);
        const [hoveredStarIndex, setHoveredStarIndex] = useState(0);

        return (
            <div>
                {Array.from({ length: 5 }, (_, index) => (
                    <span
                        key={index}
                        onClick={() => {
                            onRatingClick(songId, index + 1);
                            setClickedStarIndex(index + 1);
                        }}
                        onMouseEnter={() => setHoveredStarIndex(index + 1)}
                        onMouseLeave={() => setHoveredStarIndex(0)}
                        style={{
                            cursor: 'pointer',
                            color: index < (hoveredStarIndex || clickedStarIndex) ? 'blue' : 'gray',
                        }}
                    >
                        ★
                    </span>
                ))}
                <span>{(avgRating[songId] === 0) ? '0' : avgRating[songId].toFixed(1)}</span>
            </div>
        );
    };


    const handleRatingClick = async (songId, rating) => {
        try {
            const response = await fetch(`http://localhost:8888/songs/${songId}/rate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating }),
            });

            const updatedSong = await response.json();

            const ratings = updatedSong.ratings.map((rating) => rating.rating);
            const newAverageRating = ratings.length > 0 ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : 0;

            // Update the data in your state or trigger a re-fetch to get updated data
            setData((prevData) =>
                prevData.map((song) => (song._id === songId ? { ...updatedSong, averageRating: newAverageRating } : song))
            );

            setAvgRating((prevAvgRating) => ({
                ...prevAvgRating,
                [songId]: newAverageRating,
            }));
        } catch (error) {
            console.error('Error updating rating:', error.message);
        }
    };

    return (
        <div className='song-container'>
            <h1>Songs List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Cover</th>
                        <th>Song</th>
                        <th>Date of Release</th>
                        <th>Artist</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((song, id) => {
                        return (
                            <tr key={id}>
                                <td>
                                    <img width='50px' src={song.coverImage} alt='' />
                                </td>
                                <td>{song.name}</td>
                                <td>{new Date(song.dateOfRelease).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>

                                <td>{song.artist.map((artist, id) => artist.name).join('')}</td>
                                {/* <td>{song.ratings.length > 0 ? song.ratings.map((val) => val.rating).join(', ') : 'N/A'}</td> */}
                                <td>
                                    <StarRating rating={song.averageRating} onRatingClick={handleRatingClick} songId={song._id} />
                                </td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default GetAllSongs