import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// function tracking (event) {
//   const ratio = window.screen.width / window.screen.height;
//   const mouseX = event.clientX ;
//   const mouseY = event.clientY ;
//   console.log(mouseX, mouseY, window.screen.width, window.devicePixelRatio  );
// }
// document.addEventListener('click', (event) => tracking(event))
