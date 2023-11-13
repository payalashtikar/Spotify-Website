import React, { useState, useEffect } from 'react'
import './song.css'
const GetAllArtists = () => {
    const [data, setData] = useState([])

    const getAllArtists = async () => {
        try {
            const response = await fetch("http://localhost:8888/artists", {
                method: "GET"
            })
            const respData = await response.json();
            console.log(respData)
            setData(respData)
        }
        catch (error) {
            console.log('error fetching artists : ', error.message)
        }
    }

    const calculateAverageRating = (ratings) => {
        const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
        return ratings.length > 0 ? totalRating / ratings.length : 0;
    };

    const sortedArtists = data.sort(
        (a, b) => calculateAverageRating(b.songs.flatMap((song) => song.ratings)) - calculateAverageRating(a.songs.flatMap((song) => song.ratings))
    );

    useEffect(() => {
        getAllArtists()
    }, [])


    return (
        <div className='song-container'>
            <h1>Artist List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Artist</th>
                        <th>Date of Birth</th>
                        <th>Song</th>
                        <th>Bio</th>
                        <th>Rate</th>

                    </tr>
                </thead>
                <tbody>
                    {sortedArtists.map((item, id) => {
                        return (
                            <tr key={id}>
                                <td>{item.name}</td>
                                <td>{new Date(item.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>

                                {/* <td>{item.songs.map((val, id) => val.name).join(' , ')}</td> */}
                                <td>
                                    {item.songs.map((val, id) => {
                                        return (
                                            <ul key={id}>
                                                <li>{val.name} : {calculateAverageRating(val.ratings).toFixed(1)}</li>
                                            </ul>
                                        )
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
    )
}

export default GetAllArtists