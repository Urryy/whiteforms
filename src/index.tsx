import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { StateProvider } from './reduce/stateprovider';
import reducer, { initialState } from './reduce/reducer';

const rootNode = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  rootNode
);

