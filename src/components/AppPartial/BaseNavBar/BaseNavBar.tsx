import * as React from 'react';

import store from '@app/store';
import { push } from 'connected-react-router';

import { Tooltip } from '@material-ui/core';

import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';
import BookIcon from '@material-ui/icons/Book';

// Icon
import financeIcon from '@public/media/financeIcon.png';

// Stylesheet
import './BaseNavBar.scss';


/** Props of `BaseNavBar` component. */
type BaseNavBarProps = {
    /** CSS styles. */
    style?: React.CSSProperties;
};

type BaseNavBarStates = {

};

/* Navbar in top*/
class BaseNavBar extends React.Component<BaseNavBarProps, BaseNavBarStates> {
    constructor(props: BaseNavBarProps) {
        super(props);
        this.state = {
        };
    }


componentDidMount() {
}

render() {

        return (
            <nav className='FinanceProject-NavBar' style={this.props.style}>

                <div className='NavBar-LinkHome' onClick={this.LinkToHome}>
                    <div className='LinkHome-Icon'> <img src={financeIcon} /> </div>
                    <div className='LinkHome-Text'> Finance </div>
                </div>

                <div className='NavBar-MyInfo'>
                    <Tooltip title='qortmdalsdl22@gmail.com'>
                        <EmailIcon className='NavBar-MyInfo-Icon' />
                    </Tooltip>

                    <Tooltip title='Github'>
                        <GitHubIcon className='NavBar-MyInfo-Icon' onClick={this.openGithub}/>
                    </Tooltip>

                    <Tooltip title='Blog'>
                        <BookIcon className='NavBar-MyInfo-Icon' onClick={this.openBlog}/>
                    </Tooltip>
                </div>

            </nav>
        );
    }

    /* Link to home */
    private LinkToHome = () => {
        store.dispatch(push('/home'));
    }

    private openGithub = () => {
        window.open('https://github.com/SeungMin-Baik', 'newWindow');
    }

    private openBlog = () => {
        window.open('https://velog.io/@qortmdalsdl', 'newWindow');
    }
}

export default BaseNavBar;
