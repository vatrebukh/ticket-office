import React from 'react';

export default function ProfileMenu() {
    return (
        <div className="profile-menu">
            <a href="/profile/info" data-link>My Info</a>
            <a href="/profile/active" data-link>Active Tickets</a>
            <a href="/profile/past" data-link>Historical Tickets</a>
            <a href="/profile/favourite" data-link>Favourite Trips</a>
            <a href="/logout" data-link>Logout</a>
        </div>
    );
}