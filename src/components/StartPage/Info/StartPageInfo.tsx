import * as React from 'react';

/** Route */
import { push } from 'connected-react-router';

/** Store */
import store from '@app/store';

/** Stylesheets */
import './StartPageInfo.scss';


/** Props of `StartPageInfo` component. */
type StartPageInfoProps = {};

/** States of `StartPageInfo` component. */
type StartPageInfoStates = {};

/* StartPageInfo Component */
class StartPageInfo extends React.Component<StartPageInfoProps, StartPageInfoStates> {
    constructor(props: StartPageInfoProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className='FinanceProject-StartPageInfo'>
                {/** Title of StartPage */}
                <div className='StartPageInfo-Title'> Project that can check<br/>Financial Information. </div>
                {/** Button for Link Home */}
                <button className='StartPageInfo-StartButton' onClick={this.LinkToHome}>
                    <div className='StartButton-Text'> Get Info </div>
                </button>
            </div>
        );
    }

    /** Link to home */
    private LinkToHome = () => {
        store.dispatch(push('/home'));
    }



}

export default StartPageInfo;
