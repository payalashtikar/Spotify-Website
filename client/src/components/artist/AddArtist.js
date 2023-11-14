

import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const AddArtist = () => {
    const navigate = useNavigate()
    const [artistData, setArtistData] = useState({
        name: '',
        dob: '',
        bio: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArtistData((prevData) => ({ ...prevData, [name]: value }));
    };

    const addArtistFunction = async () => {
        try {
            const response = await fetch('http://localhost:8888/artists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(artistData),
            });
            const respData = await response.json();
            console.log('addArtistFunction response ::::', respData);
            if (respData) {
                alert('Artist added to yor list, now you can able to select ')
                navigate('/addsong')
            }
        } catch (error) {
            console.error('Error in adding Artist:', error.message);
            alert('Error in adding Artist');
        }
    };


    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Navbar />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '30px 10px' }}>
                <h1 style={{ color: 'darkgray' }}>Add artist...</h1>
                <form style={{ width: '600px' }}>
                    <div className="form-group row" style={{ margin: '10px 5px' }}>
                        <label htmlFor="artist" className="col-md-4 col-form-label">
                            Artist
                        </label>
                        <div className="col-sm-12">
                            <input type="text" className="form-control" id="artist" name="name" value={artistData.name} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group row" style={{ margin: '10px 5px' }}>
                        <label htmlFor="dob" className="col-md-4 col-form-label">
                            DOB
                        </label>
                        <div className="col-sm-12">
                            <input type="date" className="form-control" id="dob" name="dob" value={artistData.dob} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group row" style={{ margin: '10px 5px' }}>
                        <label htmlFor="bio" className="col-md-4 col-form-label">
                            Bio
                        </label>
                        <div className="col-sm-12">
                            <textarea type="text" className="form-control" id="bio" name="bio" value={artistData.bio} onChange={handleChange} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', margin: '30px 0px', justifyContent: 'center' }}>
                        <button type="button" onClick={addArtistFunction} className="btn btn-outline-danger my-2 my-sm-0" style={{ width: '150px', margin: '5px 20px' }}>
                            Cancel
                        </button>
                        <button type="button" onClick={addArtistFunction} className="btn btn-outline-success my-2 my-sm-0" style={{ width: '150px', margin: '5px 20px' }}>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddArtist;


