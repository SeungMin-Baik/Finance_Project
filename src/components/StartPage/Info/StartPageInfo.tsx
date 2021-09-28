import * as React from 'react';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

// Store
import store from '@app/store';

// Stylesheets
import './StartPageInfo.scss';


/** Props of `StartPageInfo` component. */
type StartPageInfoProps = { };

/** States of `StartPageInfo` component. */
type StartPageInfoStates = {
};

/* Start Button for Link home*/
class StartPageInfo extends React.Component<StartPageInfoProps, StartPageInfoStates> {
    constructor(props: StartPageInfoProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className='FinanceProject-StartPageInfo'>
                <div className='StartPageInfo-Title'> Project that can check<br/>Financial Information. </div>
                <button className='StartPageInfo-StartButton' onClick={this.LinkToHome}>
                    <div className='StartButton-Text'> Get Info </div>
                </button>
            </div>
        );
    }

    private LinkToHome = () => {
        store.dispatch(push('/home'));
    }



}

export default StartPageInfo;
