import reportWebVitals from './reportWebVitals';

import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import AppRouter from './AppRouter.jsx';

console.log(
    [
        `NODE_ENV=${process.env.NODE_ENV}`,
        `API_URI=${process.env.REACT_APP_API_URI}`,
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
