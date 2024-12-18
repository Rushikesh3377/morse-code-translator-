import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import your styles here
import App from './App'; // Import your main app component

// Create the root element where the app will be mounted
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your App component inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
