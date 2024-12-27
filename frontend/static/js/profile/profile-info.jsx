import React from 'react';

export default function ProfileInfo({username}) {
    return (
        <div className='passengers-page'>
            <span className='section-title'>My Profile</span>
            <div className="profile-info">
                <div className="profile-info-item">
                    <h3>Username:</h3>
                    <p>{username}</p>
                </div>
                <div className="profile-info-item">
                    <h3>Full Name:</h3>
                    <p>John River</p>
                </div>
                <div className="profile-info-item">
                    <h3>Total miles travelled:</h3>
                    <p>1889</p>
                </div>
                <div className="profile-info-item">
                    <h3>Discount:</h3>
                    <p>0%</p>
                </div>
            </div>
        </div>
    );
}