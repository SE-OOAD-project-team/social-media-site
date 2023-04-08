import reportWebVitals from './reportWebVitals';

import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import AppRouter from './AppRouter.jsx';

let server_uri = process.env.REACT_APP_API_URI;
let server_v2_uri = process.env.REACT_APP_API_V2_URI;
if (process.env.REACT_APP_API_URI === '/') {
    let pos = -1;
    for (let i = 0; i < 3; i += 1) {
        pos = window.location.href.indexOf('/', pos + 1);
    }
    server_uri = window.location.href.slice(0, pos);
}

console.log(
    [
        `NODE_ENV=${process.env.NODE_ENV}`,
        `API_URI=${process.env.REACT_APP_API_URI}`,
        `server_uri=${server_uri}`,
        `server_v2_uri=${server_v2_uri}`,
    ].join('\n')
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AppRouter />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export { server_uri, server_v2_uri };
