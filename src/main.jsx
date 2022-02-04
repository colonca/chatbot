import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configAxios from './utils/axios';
import App from './App';
import store from './redux/store';

configAxios();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
