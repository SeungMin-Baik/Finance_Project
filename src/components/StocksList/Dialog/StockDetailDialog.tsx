import * as React from 'react';

/** for UI */
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';

/** API */
import { getStockOne } from '@app/apis/stockDetail';

/** Stylesheet */
import './StockDetailDialog.scss';

/** Props of `StockDetail` component. */
type StockDetailDialogProps = {
    stockData: any;
    closeDialog: Function;
};

/** States of `StockDetail` component. */
type StockDetailDialogState = {
    /** stcok data */
    stock: Array<any>;
};


class StockDetailDialog extends React.Component<StockDetailDialogProps, StockDetailDialogState> {
    constructor(props: StockDetailDialogProps) {
        super(props);
        this.state = {
            stock: []
        };
    }

    componentDidMount() {
        /** Call Api  */
        this.callApiToFetch();
    }


    render() {
        return (
        <>
            <div className='FinanceProject-StockDetailDialog'>
                <div className='StockDetailDialog-Background' />
                {
                    this.props.stockData ?

                    <Grow in={true}>
                    <div className='StockDetailDialog-Content'>
                        {/** Title of Dialog */}
                        <div className='Content-Title'>
                            <div className='Title-info'>
                                {this.props.stockData.item}
                            </div>
                        </div>
                        <div className='Content-Info'>
                            <div className='Info-Section1'>
                                {/** stock name and price, etc */}
                                <div className='Section1-1'>
                                    <div className='item'> {this.props.stockData.item}</div>
                                    <div className='currentPrice' style={this.props.stockData.fluctuation.substring(0, 1) === '+' ? {color: 'red'}
                                                                : this.props.stockData.fluctuation.substring(0, 1) === '-' ? {color: 'blue'}
                                                                : {color: 'black'}}>
                                        {this.props.stockData.currentPrice}
                                    </div>
                                    <div className='comparedYester' style={this.props.stockData.fluctuation.substring(0, 1) === '+' ? {color: 'red'}
                                                                : this.props.stockData.fluctuation.substring(0, 1) === '-' ? {color: 'blue'}
                                                                : {color: 'black'}}>
                                        {this.props.stockData.comparedYester}
                                    </div>
                                    <div className='fluctuation' style={this.props.stockData.fluctuation.substring(0, 1) === '+' ? {color: 'red'}
                                                                : this.props.stockData.fluctuation.substring(0, 1) === '-' ? {color: 'blue'}
                                                                : {color: 'black'}}>
                                        {this.props.stockData.fluctuation}
                                    </div>
                                </div>
                                {/** stock's detail info */}
                                <div className='Section1-2'>
                                    <div className='Info'>
                                        <div className='Info-title'> 외국인비율 </div>
                                        <div className='Info-content'> {this.props.stockData.foreignersProportion} </div>
                                    </div>
                                    <div className='Info'>
                                        <div className='Info-title'> 거래량 </div>
                                        <div className='Info-content'> {this.props.stockData.volume} </div>
                                    </div>
                                    <div className='Info'>
                                        <div className='Info-title'> 시가총액 </div>
                                        <div className='Info-content'> {this.props.stockData.marketCapitalization} </div>
                                    </div>
                                </div>
                                {/** stock's detail info */}
                                <div className='Section1-3'>
                                    <div className='Info'>
                                        <div className='Info-title'> 액면가 </div>
                                        <div className='Info-content'> {this.props.stockData.par}</div>
                                    </div>
                                    <div className='Info'>
                                        <div className='Info-title'> 상장주식수 </div>
                                        <div className='Info-content'> {this.props.stockData.numOfListedStocks} </div>
                                    </div>
                                    <div className='Info'>
                                        <div className='Info-title'> PER </div>
                                        <div className='Info-content'> {this.props.stockData.per}</div>
                                    </div>
                                    <div className='Info'>
                                        <div className='Info-title'> ROE </div>
                                        <div className='Info-content'> {this.props.stockData.roe}</div>
                                    </div>
                                </div>
                                {/** chart of stock */}
                                <div className='Section1-Chart'>
                                {
                                    this.state.stock && this.state.stock.length > 0 ?
                                        <img className='chart' src={this.state.stock[0].chart} />
                                    : null
                                }
                                </div>

                            </div>
                            {/** stock's detail information */}
                            <div className='Info-Section2'>
                                <div className='Section2'>
                                    {
                                        this.state.stock && this.state.stock.length > 0 ?
                                        this.state.stock.filter(x => !x.chart).map(stock => {
                                            return (
                                            <div className='Section2-Info'>
                                                <div className='Info-key'> {stock.key_1} </div>
                                                <div className='Info-value'> {stock.value_1} </div>
                                            </div>
                                            );
                                        })
                                        : null
                                    }
                                </div>
                            </div>
                        </div>
                        {/** buttons on foot */}
                        <div className='Content-Foot'>
                            <Button variant='outlined' className='Foot-Info' onClick={() => this.props.closeDialog(false)}>
                                닫기
                            </Button>
                        </div>
                    </div>
                    </Grow>

                    : null
                }
            </div>
        </>
        );
    }

    /** Call API and fetch data  */
    private callApiToFetch = async() => {
        getStockOne(this.props.stockData.indexCode)
            .then(res => this.setState({ stock: res }))
            .catch(err => alert('데이터가 없습니다.'));
    }
}

export default StockDetailDialog;
