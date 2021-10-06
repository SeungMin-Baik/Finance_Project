import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router';

// API
import { getTopTrading, getForeignStockMarget } from '@app/apis/stocksList';

// Model
import { topTrading, foreignStockMarget } from '@app/apis/stocksList';

// Stylesheets
import './Section2.scss';


/** Props of `Section2` component. */
type Section2Props = {};

/** States of `Section2` component. */
type Section2States = {
    topTradeList: topTrading[];
    foreignStockMargetList: foreignStockMarget[];
};

/* Route Section2 */
class Section2 extends React.Component<Section2Props, Section2States> {
    constructor(props: Section2Props) {
        super(props);
        this.state = {
            topTradeList: [],
            foreignStockMargetList: []
        };
    }

    componentDidMount() {
        this.callApiToFetch();
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <div className='FinanceProject-Section2'>
                <div className='Section2-TopList'>
                    <div className='TopList-Info'>
                        <div className='Info-title'>
                            <div className='title'> 거래 상위 </div>
                        </div>
                        <div className='Info-list'>
                            {
                                this.state.topTradeList && this.state.topTradeList.length > 0 ?
                                    this.state.topTradeList.slice(0, 5).map((topTrade) => {
                                        return (
                                        <div className='topTradeList'>
                                            <div className='topTradeList-title'>
                                                - {topTrade.item}
                                            </div>
                                            <div className='topTradeList-content'> {topTrade.currentPrice} </div>
                                            <div className='topTradeList-content' style={topTrade.fluctuation.substring(0, 1) === '+' ? {color: 'red'}
                                                                                : topTrade.fluctuation.substring(0, 1) === '-' ? {color: 'blue'}
                                                                                : {color: 'black'}}>
                                                {
                                                    topTrade.fluctuation.substring(0, 1) === '+' ? '▲ '
                                                    : topTrade.fluctuation.substring(0, 1) === '-' ? '▼ '
                                                    : '■ '
                                                }
                                                {topTrade.comparedYester}
                                            </div>
                                            <div className='topTradeList-content' style={topTrade.fluctuation.substring(0, 1) === '+' ? {color: 'red'}
                                                                                : topTrade.fluctuation.substring(0, 1) === '-' ? {color: 'blue'}
                                                                                : {color: 'black'}}>
                                                {topTrade.fluctuation}
                                            </div>
                                        </div>
                                        );
                                    })
                                : null
                            }
                        </div>
                    </div>

                    <div className='TopList-Info'>
                        <div className='Info-title'>
                            <div className='title'> 해외증시 </div>
                        </div>
                        <div className='Info-list'>
                            {
                                this.state.foreignStockMargetList && this.state.foreignStockMargetList.length > 0 ?
                                    this.state.foreignStockMargetList.slice(0, 5).map((stockMarget) => {
                                        return (
                                        <div className='foreignStockMargetList'>
                                            <div className='foreignStockMargetList-title'>
                                                - {stockMarget.item}
                                            </div>
                                            <div className='foreignStockMargetList-content' style={stockMarget.updown === '상승' ? {color: 'red'}
                                                                                : stockMarget.updown === '하락' ? {color: 'blue'}
                                                                                : {color: 'black'}}>
                                                {stockMarget.currentIndex}
                                            </div>
                                            <div className='foreignStockMargetList-content' style={stockMarget.updown === '상승' ? {color: 'red'}
                                                                                : stockMarget.updown === '하락' ? {color: 'blue'}
                                                                                : {color: 'black'}}>
                                                {
                                                    stockMarget.updown === '상승' ? '▲ '
                                                    : stockMarget.updown === '하락' ? '▼ '
                                                    : '■ '
                                                }
                                                {stockMarget.comparedYester}
                                            </div>
                                        </div>
                                        );
                                    })
                                : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private callApiToFetch = async() => {
        await getTopTrading()
            .then(res => this.setState({ topTradeList: res }))
            .catch(err => alert('거래상위 데이터가 없습니다.'));

        await getForeignStockMarget()
            .then(res => this.setState({ foreignStockMargetList: res }))
            .catch(err => alert('해외증시 데이터가 없습니다.'));
    }
}

export default Section2;
