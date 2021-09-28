import * as React from 'react';
import { Switch, Route } from 'react-router';

// Component
import MelonInfo from './Info/MelonInfo';


type MelonStates = { };

class Melon extends React.Component<{}, MelonStates> {
    constructor(props: {}) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route
                        path='/Melon'
                        component={MelonInfo}
                        exact
                    />
                </Switch>
            </div>
        );
    }
}

export default Melon;