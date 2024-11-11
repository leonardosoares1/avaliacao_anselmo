import React from 'react';

import './styles/global.css';

import { createRoot } from 'react-dom/client';

import Root from './Root';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
