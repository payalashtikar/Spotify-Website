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
            console.log('error', error)
        }
    }
    useEffect(() => {
        getAllArtists()
    }, [])


    return (
        <div className='song-container'>
            <table>
                <thead>
                    <tr>
                        <th>Artist</th>
                        <th>Date of Birth</th>
                        <th>Song</th>
                        <th>Bio</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, id) => {
                        return (
                            <tr key={id}>
                                <td>{item.name}</td>
                                <td>{new Date(item.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>

                                {/* <td>{item.songs.map((val, id) => val.name).join(' , ')}</td> */}
                                <td>
                                    {item.songs.map((val, id) => {
                                        return (
                                            <ul key={id}>
                                                <li>{val.name}</li>
                                            </ul>
                                        )
                                    })}
                                </td>
                                <td>{item.bio}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default GetAllArtists