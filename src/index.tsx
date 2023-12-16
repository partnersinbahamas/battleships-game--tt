import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter  as AppRouter } from 'react-router-dom';
import { App } from './App';
import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppRouter>
      <App />
    </AppRouter>
  </React.StrictMode>
);