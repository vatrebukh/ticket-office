import React, { useState } from 'react';
import '../css/login.scss';
import UserProfile from './profile/profile-main';
import { login } from './service/login-service';
import { SessionContext } from './profile/SessionContext';

export default function LoginForm() {   
    const [formData, setFormData] = useState({"login": "", "password": "", "error": ""});
    const [loginning, setLoginning] = useState(false);
    const [sessionUser, setSessionUser] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoginning(true);
        login(formData).then(userInfo => {
            setSessionUser(userInfo);
            setLoginning(false);
        }).catch(err => {
            setFormData(prevState => ({
                ...prevState,
                error: 'Invalid login or password'
            }));
            setLoginning(false);
        });
    };

    if (sessionUser) {
        return (
            <SessionContext.Provider value={sessionUser}>
                <UserProfile />
            </SessionContext.Provider>
        );
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                { formData.error && <div className='notification-red'>{formData.error}</div> }
                <div className="form-group">
                    <label htmlFor="login">Login</label>
                    <input
                        type="text"
                        id="login"
                        name="login"
                        value={formData.login}
                        onChange={handleChange}
                        required
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
                        required
                    />
                </div>
                <button type="submit" className="login-button" disabled={loginning}>
                    Log In
                </button>
            </form>
        </div>
    );
};
