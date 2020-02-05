import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import storage from './redux/store';

const { store, persistor } = storage;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  , document.getElementById('root')
);
