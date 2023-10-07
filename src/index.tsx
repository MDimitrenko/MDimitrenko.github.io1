import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.sass';
import App from './App';
import { Provider } from 'react-redux'
import { store } from './reduxToolkit/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
 // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
//  </React.StrictMode>
);
