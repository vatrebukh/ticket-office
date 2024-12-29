import { Router } from "./router.js";
import React from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from "./home.jsx";
import TicketMainPage from "./tickets/ticket-main.jsx"
import UserProfile from "./profile/profile-main.jsx";
import { SessionContext } from './profile/SessionContext';
import { currentUser, logout } from './service/login-service';

const root = createRoot(document.getElementById('root'));

const routes = [
    { path: '/', view: () => root.render(<HomePage/>) },
    { path: '/tickets/bus', view: () => root.render(<TicketMainPage/>) },
    { path: '/tickets/train', view: () => root.render(<TBDPage/>) },
    { path: '/profile', view: () => root.render(
        <SessionContext.Provider value={currentUser}>
            <UserProfile />
        </SessionContext.Provider>
    ) },
    { path: '/logout', view: () => {
        logout();
        root.render(<HomePage/>)
    } },
];

const router = new Router(routes);

export const navigate = () => {
    let { route, params } = router.findRoute(location.pathname);
    route.view(params);
};

window.addEventListener("popstate", navigate);

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            history.pushState(null, null, e.target.href);
            navigate();
        }
    });

    navigate();
});


function TBDPage() {
    return <h1>Page is under development</h1>;
}
