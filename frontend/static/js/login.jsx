import React, { useState } from 'react';
import '../css/login.scss';
import UserProfile from './profile/user-profile';

export default function LoginForm() {   
    const [formData, setFormData] = useState({"login": "", "password": ""});
    const [authorized, setAuthorized] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login:', formData.login);
        setAuthorized(true);
    };

    if (authorized) {
        return <UserProfile username={formData.login || 'johnny'} />;
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="login">Login</label>
                    <input
                        type="text"
                        id="login"
                        name="login"
                        value={formData.login}
                        onChange={handleChange}
                        // required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        // required
                    />
                </div>
                <button type="submit" className="login-button">
                    Log In
                </button>
            </form>
        </div>
    );
};
