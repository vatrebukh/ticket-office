import React, { useContext } from 'react';
import { SessionContext } from './SessionContext';

export default function ProfileInfo() {
    const sessionUser = useContext(SessionContext);
    return (
        <div className='passengers-page'>
            <span className='section-title'>My Profile</span>
            <div className="profile-info">
                <div className="profile-info-item">
                    <h3>Username:</h3>
                    <p>{sessionUser.username}</p>
                </div>
                <div className="profile-info-item">
                    <h3>Full Name:</h3>
                    <p>{sessionUser.fullName}</p>
                </div>
                <div className="profile-info-item">
                    <h3>City:</h3>
                    <p>{sessionUser.city}</p>
                </div>
                <div className="profile-info-item">
                    <h3>Total miles travelled:</h3>
                    <p>{sessionUser.miles}</p>
                </div>
                <div className="profile-info-item">
                    <h3>Discount:</h3>
                    <p>0%</p>
                </div>
            </div>
        </div>
    );
}