import Keycloak from 'keycloak-js';

const keycloakinit = new Keycloak({
    realm: 'psp',
    url: 'https://pspv2.st.by/auth/',
    clientId: 'WhiteForms',
});

export default keycloakinit;