import React,{useState,useEffect} from 'react'
import './song.css'
const GetAllSongs = () => {
    const [data, setData] = useState([])

    const getAllSongs = async () => {
        try {
            const response = await fetch("http://localhost:8888/songs", {
                method: "GET"
            })
            const respData = await response.json();
            console.log(respData)
            console.log(respData.artists)
            setData(respData)
        }
        catch (error) {
            console.log('error', error)
        }
    }
    useEffect(() => {
        getAllSongs()
    }, [])


    return (
        <div className='song-container'>
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
                                    <img width='50px' src={song.coverImage} alt=''/>
                                </td>
                                <td>{song.name}</td>
                                <td>{new Date(song.dateOfRelease).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>

                                <td>{song.artist.map((artist, id) => artist.name).join('')}</td>
                                <td>{song.ratings.length > 0 ? song.ratings.map((val) => val.rating).join(', ') : 'N/A'}</td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default GetAllSongs