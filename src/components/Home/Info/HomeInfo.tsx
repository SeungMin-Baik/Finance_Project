import * as React from 'react';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

// Stroe
import store from '@app/store';

import './HomeInfo.scss';

type HomeInfoProps = {} & RouteComponentProps;

type HomeInfotStates = {
};

class HomeInfo extends React.Component<HomeInfoProps, HomeInfotStates> {

    constructor(props: HomeInfoProps) {
        super(props);
        this.state = {
        };
    }

    render() {

        return (
            <div className='FinanceProject-HomeInfo'>
                Home
            </div>
        );
    }

}

export default HomeInfo;