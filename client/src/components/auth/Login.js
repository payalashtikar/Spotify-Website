import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../navbar/Nav';

const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Send the login data to the server
            const response = await fetch('http://localhost:8888/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if (response.ok) {
                // Login successful, handle success
                console.log('Login successful:', responseData.message);
                navigate('/homepage')
            } else {
                // Login failed, update the error state
                setError(responseData.error || 'Login failed');
            }
        } catch (error) {
            console.error('Login failed:', error.message);
            setError('Login failed. Please try again later.');
        }
    };

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <Nav />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <form
                    onSubmit={handleLogin}
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '500px', border: '1px solid gray', padding: '25px 20px', borderRadius: '15px' }}
                >
                    <h1 style={{ margin: '15px 10px' }}>Login Form</h1>
                    {error && <div style={{ color: 'red', margin: '0 10px' }}>{error}</div>}
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '15px 10px' }}>
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input
                            type="email"
                            name='email'
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={data.email}
                            onChange={handleInput}
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '15px 10px' }}>
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            type="password"
                            name='password'
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            value={data.password}
                            onChange={handleInput}
                        />
                    </div>
                    <button style={{ margin: '15px 10px' }} type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

