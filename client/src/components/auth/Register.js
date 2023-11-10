
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate()

    const handleInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Send the registration data to the server
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();
            console.log(responseData)

            if (response.ok) {
                // Registration successful, handle success
                console.log('Registration successful:', responseData.message);
                // alert('Registration successful', responseData.message)
                navigate('/login')
            } else {
                // Registration failed, handle error
                setError(responseData.error || 'Registration failed');
                console.error('Registration failed:', responseData.error || 'Unknown error');
                // alert('Registration failed', responseData.error)
            }
        } catch (error) {
            console.error('Registration failed:', error.message);
            // alert('Registration failed', error.message)
            setError('Registration failed. Please try again later.');
        }
    };

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <form
                    onSubmit={handleRegister}
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '500px', border: '1px solid gray', padding: '25px 20px', borderRadius: '15px' }}
                >
                    <h1 style={{ margin: '15px 10px' }}>Register Form</h1>
                    {error && <div style={{ color: 'red', margin: '0 10px' }}>{error}</div>}
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '15px 10px' }}>
                        <label htmlFor="exampleInputName">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            id="exampleInputName"
                            aria-describedby="emailHelp"
                            placeholder="Enter Name"
                            value={data.name}
                            onChange={handleInput}
                            required

                        />
                    </div>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '15px 10px' }}>
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={data.email}
                            onChange={handleInput}
                            required

                        />
                        <small id="emailHelp" className="form-text text-muted">
                            We'll never share your email with anyone else.
                        </small>
                    </div>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '15px 10px' }}>
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            value={data.password}
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <button style={{ margin: '15px 10px' }} type="submit" className="btn btn-primary">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
