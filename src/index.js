import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
 
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
if (rootElement.hasChildNodes()) {
  root.hydrate(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}


