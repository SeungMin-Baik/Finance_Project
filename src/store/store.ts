import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import rootReducer from './root-reducer';
import {
    composeEnhancers,
    getAppAuthState
} from './utils';

export const history = createBrowserHistory();

const store = createStore(
    rootReducer(history),
    getAppAuthState() as any,
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(history)
        )
    )
);


export default store;
