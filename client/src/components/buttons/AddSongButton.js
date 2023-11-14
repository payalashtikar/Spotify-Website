import React from 'react'
import { useNavigate } from 'react-router-dom'

const AddSongButton = () => {
    const navigate = useNavigate()
    const gotToAddSongComponent = () => { navigate('/addsong') }
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px 25px 0px' }}>
            <button onClick={gotToAddSongComponent} class="btn btn-outline-success my-2 my-sm-0" type="submit">+ Add Song</button>
        </div>
    )
}

export default AddSongButton