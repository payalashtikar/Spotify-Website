import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon, calculateSize } from '@iconify/react';
import Nav from '../navbar/Nav';

const LandingPage = () => {
    const navigate = useNavigate()
    const gotoLoginPage = () => { navigate('/login') }
    const gotoRegisterPage = () => { navigate('/register') }
    return (
        <div style={{ height: '' }}>
        <Nav/>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <h1>Welcome to Spotify</h1>
                <div>
                    <button style={{ margin: '15px 10px', width: '100px' }} type="submit" class="btn btn-primary" onClick={gotoLoginPage}>Login</button>
                    <button style={{ margin: '15px 10px', width: '100px' }} type="submit" class="btn btn-primary" onClick={gotoRegisterPage}>Register</button>
                </div>
            </div>
        </div>
    )
}

export default LandingPage