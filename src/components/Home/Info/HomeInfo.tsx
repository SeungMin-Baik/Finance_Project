import * as React from 'react';

/** Route */
import { RouteComponentProps } from 'react-router';

/** Component */
import Indexes from '@app/components/Indexes';
import StocksList from '@app/components/StocksList';
import TopList  from '@app/components/TopList';

/** Stylesheet */
import './HomeInfo.scss';

/** Props of `HomeInfo` component. */
type HomeInfoProps = {} & RouteComponentProps;

/** States of `HomeInfo` component. */
type HomeInfotStates = {};

/** HomeInfo Component */
class HomeInfo extends React.Component<HomeInfoProps, HomeInfotStates> {
    constructor(props: HomeInfoProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className='FinanceProject-HomeInfo'>
                <Indexes />
                <TopList />
                <StocksList />
            </div>
        );
    }

}

export default HomeInfo;