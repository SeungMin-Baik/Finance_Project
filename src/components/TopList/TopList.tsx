import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router';

// API
import { getTopIndustries, getTopTrading, getTopTheme, getPopularitySearch, getForeignStockMarget } from '@app/apis/stocksList';

// Stylesheets
import './TopList.scss';


/** Props of `TopList` component. */
type TopListProps = {};

/** States of `TopList` component. */
type TopListStates = {
};

/* Route TopList */
class TopList extends React.Component<TopListProps, TopListStates> {
    constructor(props: TopListProps) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        getTopTrading()
            .then(res => console.log('거래상위', res));
        getTopIndustries()
            .then(res => console.log('업종상위', res));
        getTopTheme()
            .then(res => console.log('테마상위', res));
        getPopularitySearch()
            .then(res => console.log('검색상위', res));
        getForeignStockMarget()
            .then(res => console.log('해외증시', res));
    }

    render() {
        return (
            <div className='FinanceProject-TopList'>
            </div>
        );
    }
}

export default TopList;
