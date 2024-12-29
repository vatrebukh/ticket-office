import { users } from './data.js';

export let currentUser = null;

export function login({login, password}) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let user = users.find(user => user.username === login && user.password === password);
            if (!user) {
                reject('Invalid login or password');
                return;
            }
            currentUser = user;
            resolve(user);
        }, 500);
    });
}

export function logout() {
    currentUser = null;
}