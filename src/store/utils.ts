import { compose } from 'redux';
import config from '@app/config';

/**
 * Store enhancer.
 * ref: https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
 */
export const composeEnhancers =
    (process.env.NODE_ENV === 'development' &&
        window &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;


/**
 * Get app authentication state from session storage.
 */
export const getAppAuthState = () => {
    try {
        const authState = atob(sessionStorage.getItem(config.APP.STOR_KEY.AUTH));
        return { appAuth: authState ? JSON.parse(authState) : {} };
    } catch {
        return {};
    }
};
