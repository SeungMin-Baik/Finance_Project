import * as React from 'react';
import { Switch, Route } from 'react-router';

// Component
import HomeInfo from './Info/HomeInfo';

// StyleSeet
import './Home.scss';

type HometStates = { };

/* Route home*/
class Home extends React.Component<{}, HometStates> {
    constructor(props: {}) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className='FinanceProject-Home'>
                <Switch>
                    <Route
                        path='/home'
                        component={HomeInfo}
                        exact
                    />
                </Switch>
            </div>
        );
    }
}

export default Home;