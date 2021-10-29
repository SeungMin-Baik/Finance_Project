import * as React from 'react';

/** Route */
import { Switch, Route, Redirect } from 'react-router';

/** Component */
import StartPageInfo from './Info';

/** Image */
import financeImage from '@public/media/financeImage.png';

/** Stylesheets */
import './StartPage.scss';


/** Props of `StartPage` component. */
type StartPageProps = {};

/** States of `StartPage` component. */
type StartPageStates = {
};

/* StartPage Component */
class StartPage extends React.Component<StartPageProps, StartPageStates> {
    constructor(props: StartPageProps) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <div className='FinanceProject-StartPage' style={{ backgroundImage: `url('${financeImage}')` }}>
                <div className='StartPage-contents'>
                    {/** Routing */}
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
