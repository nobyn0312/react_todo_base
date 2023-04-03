import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Filter from './components/Filter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='container'>
      <React.StrictMode>
    <App />
    <Filter/>
  </React.StrictMode>
  </div>

);