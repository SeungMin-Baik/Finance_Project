const __ = {
    protocol: 'http',
    hostname: 'localhost:8080',
    apiVersion: 1
};
const __API_ROOT = `${__.protocol}://${__.hostname}`;
const __API_END_POINT = `${__API_ROOT}/v${__.apiVersion}`;

const BAIK_APIS = {
};

export default BAIK_APIS;
