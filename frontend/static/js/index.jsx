import { Router } from "./router.js";
import React from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));

const routes = [
    { path: '/', view: () => root.render(<HomePage/>) },
    { path: '/home', view: () => root.render(<HomePage/>) },
    { path: '/seats', view: () => root.render(<SeatsPage/>) },
    { path: '/payment', view: () => root.render(<PaymentPage/>) },
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

function HomePage() {
    return <h1>Where are you going?</h1>;
}

function SeatsPage() {
    return <h1>Select seats</h1>;
}

function PaymentPage() {
    return <h1>Get your money!</h1>;
}
