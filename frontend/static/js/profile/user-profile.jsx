import React, { useState } from 'react';
import ProfileMenu from './profile-menu';
import ProfileInfo from './profile-info';

export default function UserProfile({username, section}) {
    return (
        <div className="page">
            <ProfileMenu />
            {!section || section == 'info' ? <ProfileInfo username={username} /> : null}
            {section == 'active' ? <ActiveTickets /> : null}
            {section == 'past' ? <PastTickets /> : null}
            {section == 'favourite' ? <FavouriteTrips /> : null}
        </div>
    );
}


function ActiveTickets() {
    return (
        <div className='passengers-page'>
            <span className='section-title'>My Tickets</span>
            
        </div>
    );
}

function PastTickets() {
    return (
        <div className='passengers-page'>
            <span className='section-title'>Historical tickets</span>
            
        </div>
    );
}

function FavouriteTrips() {
    return (
        <div className='passengers-page'>
            <span className='section-title'>Favourite Trips</span>
            
        </div>
    );
}