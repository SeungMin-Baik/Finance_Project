import BAIK_APIS from './baik-apis';

const config = {
    APP: {
        /** Browser session storage key. */
        STOR_KEY: {
            /** App authentication state. */
            AUTH: 'finance::user-session'
        }
    },

    EXTERNAL: {
        BAIK: BAIK_APIS
    }
};

export default config;
