import React, { useState } from 'react';

export default function UserProfile({username}) {
    
    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            <div className="profile-info">
                <div className="profile-info-item">
                    <h3>Username:</h3>
                    <p>{username}</p>
                </div>
                <div className="profile-info-item">
                    <h3>Full Name:</h3>
                    <p>John River</p>
                </div>
            </div>
        </div>
    );
}