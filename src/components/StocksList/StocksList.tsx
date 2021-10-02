import * as React from 'react';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

// API
import { getStocksList, stockObject } from '@app/apis/finance';

// StyleSheet
import './StocksList.scss';

type StocksListProps = {

};

type StocksListtStates = {
    stocksList: stockObject[];
    listType: string;
    page: number;
};

class StocksList extends React.Component<StocksListProps, StocksListtStates> {

    constructor(props: StocksListProps) {
        super(props);
        this.state = {
            stocksList: [],
            listType: 'KOSPI',
            page: 1
        };
    }

    componentDidMount() {
        this.callApiToFetch();
    }

    componentDidUpdate() {
        console.log(this.state.stocksList);
    }

    render() {

        return (
            <div className='FinanceProject-StocksList'>
            </div>
        );
    }

    private callApiToFetch = async() => {
        await getStocksList(this.state.listType, this.state.page)
            .then(res => this.setState({ stocksList: res }))
            .catch(err => console.error(err));
    }

}

export default StocksList;