import * as React from 'react';
import { Route, Switch } from 'react-router';
import Loadable from 'react-loadable';

// Custom Components
import { AppBaseNavBar } from '@app/components/AppPartial';

// Other components
import {
    Loading as LoadingPage,
    NotFound as NotFoundComponent
} from './Others';

// Stylesheet
import './App.scss';


/* Asynchronous app components for lazy-load */
const AsyncHomeComponent = Loadable({
    loader: () => import(/* webpackChunkName: "home" */ './Home'),
    loading: LoadingPage
});
const AsyncStartPageComponent = Loadable({
    loader: () => import(/* webpackChunkName: "auth" */ './StartPage'),
    loading: LoadingPage
});
const AsyncIndustryThemeComponent = Loadable({
    loader: () => import(/* webpackChunkName: "IndustryTheme" */ './TopList/Detail/IndustryThemeDetail'),
    loading: LoadingPage
});
const AsyncPopularitySearchComponent = Loadable({
    loader: () => import(/* webpackChunkName: "PopularitySearch" */ './TopList/Detail/PopularitySearchDetail'),
    loading: LoadingPage
});


/** Props of `App` component. */
type AppComponentProps = { };

/** States of `App` component. */
type AppComponentStates = {
};

class App extends React.Component<AppComponentProps, AppComponentStates> {
    constructor(props: AppComponentProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className='FinanceProject-Container'>
                {/* App Body Contents */}
                <div className={ `/${window.location.pathname.substring(2)}` === '/' ? 'FinanceProject-Body' : 'FinanceProject-Body-Info'}>
                {
                    `/${window.location.pathname.substring(2)}` !== '/' ?
                        <AppBaseNavBar />
                    : null
                }
                    <Switch>
                        <Route
                            path='/'
                            component={AsyncStartPageComponent}
                            exact
                        />
                        <Route
                            path='/home'
                            component={AsyncHomeComponent}
                            exact
                        />
                        <Route
                            path='/industryTheme'
                            component={AsyncIndustryThemeComponent}
                            exact
                        />
                        <Route
                            path='/popularitySearch'
                            component={AsyncPopularitySearchComponent}
                            exact
                        />
                        <Route
                            path='**'
                            component={NotFoundComponent}
                        />
                    </Switch>
                </div>
            </div>
        );
    }

}

export default App;
