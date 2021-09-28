import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import StartPageInfo from './Info';

// Image
import financeImage from '@public/media/financeImage.png';


// Stylesheets
import './StartPage.scss';


/** Props of `StartPage` component. */
type StartPageProps = {};

/** States of `StartPage` component. */
type StartPageStates = {
};

/* Route StartPage */
class StartPage extends React.Component<StartPageProps, StartPageStates> {
    constructor(props: StartPageProps) {
        super(props);
        this.state = {
            tabIndex: 0
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className='FinanceProject-StartPage' style={{ backgroundImage: `url('${financeImage}')` }}>
                <div className='StartPage-contents'>
                    <Switch>
                        <Route
                            path='/'
                            component={StartPageInfo}
                            exact
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default StartPage;
