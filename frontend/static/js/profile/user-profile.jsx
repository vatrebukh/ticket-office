import React, { useState } from 'react';
import ProfileMenu from './profile-menu';
import ProfileInfo from './profile-info';

export default function UserProfile({username}) {
    const [menu, setMenu] = useState(profileMenu);

    let activeSection = menu.find(link => link.active)?.section;
    return (
        <div className="page">
            <ProfileMenu menu={menu} setMenu={setMenu} />
            {!activeSection || activeSection == 'info' ? <ProfileInfo username={username} /> : null}
            {activeSection == 'active' ? <ActiveTickets /> : null}
            {activeSection == 'past' ? <PastTickets /> : null}
            {activeSection == 'favourite' ? <FavouriteTrips /> : null}
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
            <span className='section-title'>Past Trips</span>
            
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

const profileMenu = [
    {name: 'My Info', active: false, section: 'info'},
    {name: 'Active Tickets', active: false, section: 'active'},
    {name: 'Past Trips', active: false, section: 'past'},
    {name: 'Favourite Trips', active: false, section: 'favourite'},
]