import * as React from 'react';

import Button from '@material-ui/core/Button';

import { FormattedMessage, FormattedRelative } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

// API
import { getStocksList, stockObject } from '@app/apis/stocksList';

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
    private titleList = [
        'N', '종목명', '현재가', '전일비', '등락률', '액면가', '시가총액',
        '상장주식수', '외국인비율', '거래량', 'PER', 'ROE'
    ];
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
    }

    render() {

        return (
            <div className='FinanceProject-StocksList'>
                <div className='StocksList-Header'>
                    <div className='Header-Info' >
                        <Button className='Info-button' onClick={() => this.changeTab('KOSPI')}
                                style={this.state.listType === 'KOSPI' ? {color: '#000000', background: '#e9e9e9'} : {color: '#dddddd'}}>
                            코스피
                        </Button>
                    </div>
                    <div className='Header-Info'>
                        <Button className='Info-button' onClick={() => this.changeTab('KOSDAQ')}
                                style={this.state.listType === 'KOSDAQ' ? {color: '#000000', background: '#e9e9e9'} : {color: '#dddddd'}}>
                            코스닥
                        </Button>
                    </div>
                </div>

                <div className='StocksList-Title'>
                    {
                        this.titleList.map(title => {
                            return (
                                <div className='Title-Info'>
                                    {title}
                                </div>
                            );
                        })
                    }
                </div>

                <table className='StocksList-Body'>
                    {
                        this.state.stocksList && this.state.stocksList.length > 0 ?
                        this.state.stocksList.map(stock => {
                            return (
                            <tbody>
                            <tr className='Body-Info'>
                                <td className='Info-text'>
                                    {stock.num}
                                </td>
                                <td className='Info-text'>
                                    {stock.item}
                                </td>
                                <td className='Info-text'>
                                    {stock.currentPrice}
                                </td>
                                <td className='Info-text' style={stock.fluctuation.substring(0, 1) === '+' ? {color: 'red'}
                                                                : stock.fluctuation.substring(0, 1) === '-' ? {color: 'blue'}
                                                                : {color: 'black'}}>
                                    {
                                        stock.fluctuation.substring(0, 1) === '+' ? '▲ '
                                        : stock.fluctuation.substring(0, 1) === '-' ? '▼ '
                                        : '■ '
                                    }
                                    {stock.comparedYester}
                                </td>
                                <td className='Info-text' style={stock.fluctuation.substring(0, 1) === '+' ? {color: 'red'}
                                                                : stock.fluctuation.substring(0, 1) === '-' ? {color: 'blue'}
                                                                : {color: 'black'}}>
                                    {stock.fluctuation}
                                </td>
                                <td className='Info-text'>
                                    {stock.par}
                                </td>
                                <td className='Info-text'>
                                    {stock.marketCapitalization}
                                </td>
                                <td className='Info-text'>
                                    {stock.numOfListedStocks}
                                </td>
                                <td className='Info-text'>
                                    {stock.foreignersProportion}
                                </td>
                                <td className='Info-text'>
                                    {stock.volume}
                                </td>
                                <td className='Info-text'>
                                    {stock.per}
                                </td>
                                <td className='Info-text'>
                                    {stock.roe}
                                </td>
                            </tr>
                            </tbody>
                            );
                        })
                        : null
                    }
                </table>

                <div className='StocksList-Footer'>
                    <div className='Footer-Info'>
                        <span className='Info-button' onClick={() => this.changePage('init')}> 첫페이지 </span>
                        <span className='Info-dummy' />
                        <span className='Info-button' onClick={() => this.changePage('prev')}> ◁ 이전 </span>
                        <span className='Info-dummy' />
                        <span className='Info-button' onClick={() => this.changePage('next')}> 다음 ▷ </span>
                        <span className='Info-dummy' />
                    </div>
                </div>

            </div>
        );
    }

    private callApiToFetch = async() => {
        await getStocksList(this.state.listType, this.state.page)
            .then(res => this.setState({ stocksList: res }))
            .catch(err => alert('데이터가 없습니다.'));
    }

    private changeTab = (type: string) => {
        this.setState({ listType: type}, () => this.callApiToFetch());
    }

    private changePage = (change: string) => {
        if (change === 'prev') {
            if (this.state.page > 1) {
                this.setState({ page: this.state.page - 1}, () => this.callApiToFetch());
            } else {
                alert('첫번째 페이지입니다.');
            }
        }

        else if (change === 'next') {
            this.setState({ page: this.state.page + 1}, () => this.callApiToFetch());
        }

        else if (change === 'init') {
            this.setState({ page: 1}, () => this.callApiToFetch());
        }
    }

}

export default StocksList;