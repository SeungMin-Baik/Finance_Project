import * as React from 'react';

/** Route */
import { Switch, Route } from 'react-router';

/** Component */
import HomeInfo from './Info/HomeInfo';

/** StyleSeet */
import './Home.scss';

/** States of `Home` component. */
type HometStates = {};

/** Home */
class Home extends React.Component<{}, HometStates> {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div className='FinanceProject-Home'>
                {/** Routing */}
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