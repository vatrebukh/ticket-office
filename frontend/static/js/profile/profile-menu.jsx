import React, { useState } from 'react';

export default function ProfileMenu({menu, setMenu}) {

    function activate(index) { 
        let upd = menu.map((item, idx) => {
            return {...item, active: index == idx } 
        })
        setMenu(upd);
    }

    return (
        <div className="profile-menu">
            {
                menu.map((item, index) => {
                    return <span key={index} className={item.active ? 'active' : ''} onClick={() => activate(index)} >{item.name}</span>
                })
            }
            <a href='/logout' data-link>Logout</a>
        </div>
    );
}