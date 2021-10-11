import * as React from 'react';

// API
import { getPopularitySearch } from '@app/apis/stocksList';

// Model
import { popularitySearch } from '@app/apis/stocksList';

// Stylesheets
import './PopularitySearchDetail.scss';


/** Props of `PopularitySearchDetail` component. */
type PopularitySearchDetailProps = {};

/** States of `PopularitySearchDetail` component. */
type PopularitySearchDetailStates = {
    searchList: popularitySearch[];
};

/* Route PopularitySearchDetail */
class PopularitySearchDetail extends React.Component<PopularitySearchDetailProps, PopularitySearchDetailStates> {
    private titleList = [
        '순위', '종목명', '검색비율', '현재가', '전일비', '등락률', '거래량',
        '시가', '고가', '저가', 'PER', 'ROE'
    ];
    constructor(props: PopularitySearchDetailProps) {
        super(props);
        this.state = {
            searchList: []
        };
    }

    componentDidMount() {
        this.callApiToFetch();
    }

    componentDidUpdate() {
        console.log('searchList', this.state.searchList);
    }

    render() {
        return (
            <div className='FinanceProject-PopularitySearchDetail'>

                <div className='PopularitySearchDetail-PopularitySearchList'>
                    <div className='PopularitySearchList-Header'>
                        검색 상위 종목
                    </div>

                    <div className='PopularitySearchList-Title'>
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


                    <div className='PopularitySearchList-Body'>
                    {
                        this.state.searchList && this.state.searchList.length > 0 ?
                            this.state.searchList.map(search => {
                                return (
                                <>
                                <div className='Body-Info'>
                                    <div className='Info-text'> {search.num} </div>
                                    <div className='Info-text'> {search.item} </div>
                                    <div className='Info-text'> {search.rate} </div>
                                    <div className='Info-text'> {search.currentPrice} </div>
                                    <div className='Info-text' style={search.fluctuation.substring(0, 1) === '+' ? {color: 'red'}
                                                                : search.fluctuation.substring(0, 1) === '-' ? {color: 'blue'}
                                                                : {color: 'black'}}>
                                        {
                                            search.fluctuation.substring(0, 1) === '+' ? '▲ '
                                            : search.fluctuation.substring(0, 1) === '-' ? '▼ '
                                            : '■ '
                                        }
                                        {search.comparedYester}
                                    </div>
                                    <div className='Info-text' style={search.fluctuation.substring(0, 1) === '+' ? {color: 'red'}
                                                                    : search.fluctuation.substring(0, 1) === '-' ? {color: 'blue'}
                                                                    : {color: 'black'}}>
                                        {search.fluctuation}
                                    </div>
                                    <div className='Info-text'> {search.volume} </div>
                                    <div className='Info-text'> {search.marketPrice} </div>
                                    <div className='Info-text'> {search.highPrice} </div>
                                    <div className='Info-text'> {search.lowPrice} </div>
                                    <div className='Info-text'> {search.per} </div>
                                    <div className='Info-text'> {search.roe} </div>
                                </div>
                                </>
                                );
                            })
                        : null
                    }
                    </div>
                </div>
            </div>
        );
    }

    private callApiToFetch = async() => {
        await getPopularitySearch()
            .then(res => this.setState({ searchList: res }))
            .catch(err => alert('검색 상위 데이터가 없습니다.'));
    }
}

export default PopularitySearchDetail;
