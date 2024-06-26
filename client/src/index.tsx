import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { StateProvider } from './reduce/stateprovider';
import reducer, { initialState } from './reduce/reducer';
import axios from 'axios';
import Keycloak from 'keycloak-js';

import keycloakinit from './utils/keycloak';
import { ReactKeycloakProvider } from '@react-keycloak/web';

axios.defaults.baseURL = 'https://stws2937:7027';
axios.defaults.withCredentials = true;

const rootNode = document.getElementById('root');
ReactDOM.render(
    <ReactKeycloakProvider authClient={keycloakinit}>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </ReactKeycloakProvider>,
  rootNode
);

