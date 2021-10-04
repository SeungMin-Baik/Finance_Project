import * as React from 'react';
import { push } from 'connected-react-router';
import store from '@app/store';
import { Switch, Route, Redirect } from 'react-router';

// API
import { getTopIndustries, getTopTheme, getPopularitySearch } from '@app/apis/stocksList';

// Model
import { topIndustry, topTheme, popularitySearch } from '@app/apis/stocksList';

// Stylesheets
import './Section1.scss';


/** Props of `Section1` component. */
type Section1Props = {};

/** States of `Section1` component. */
type Section1States = {
    industryList: topIndustry[];
    themeList: topTheme[];
    searchList: popularitySearch[];
};

/* Route Section1 */
class Section1 extends React.Component<Section1Props, Section1States> {
    constructor(props: Section1Props) {
        super(props);
        this.state = {
            industryList: [],
            themeList: [],
            searchList: []
        };
    }

    componentDidMount() {
        this.callApiToFetch();
    }

    render() {
        return (
            <div className='FinanceProject-Section1'>
                <div className='Section1-TopList'>
                    <div className='TopList-Info'>
                        <div className='Info-title'>
                            <div className='title'> 업종상위 </div>
                            <div className='more' onClick={this.LinkToIndustryThemeDetail}> 더보기 </div>
                        </div>
                        <div className='Info-list'>
                            {
                                this.state.industryList && this.state.industryList.length > 0 ?
                                    this.state.industryList.slice(0, 5).map((industry, index) => {
                                        return (
                                        <div className='list'>
                                            <div className='list-num'> {index + 1}.</div>
                                            <div className='list-title'> {industry.item} </div>
                                            <div className='list-content' style={industry.fluctuation.substring(0, 1) === '+' ? {color: 'red'}
                                                                        : industry.fluctuation.substring(0, 1) === '-' ? {color: 'blue'}
                                                                        : {color: 'black'}}>
                                                {industry.fluctuation}
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
                            <div className='title'> 테마상위 </div>
                            <div className='more' onClick={this.LinkToIndustryThemeDetail}> 더보기 </div>
                        </div>
                        <div className='Info-list'>
                            {
                                this.state.themeList && this.state.themeList.length > 0 ?
                                    this.state.themeList.slice(0, 5).map((theme, index) => {
                                        return (
                                        <div className='list'>
                                            <div className='list-num'> {index + 1}.</div>
                                            <div className='list-title'> {theme.item} </div>
                                            <div className='list-content' style={theme.fluctuation.substring(0, 1) === '+' ? {color: 'red'}
                                                                        : theme.fluctuation.substring(0, 1) === '-' ? {color: 'blue'}
                                                                        : {color: 'black'}}>
                                                {theme.fluctuation}
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
                            <div className='title'> 검색상위 </div>
                            <div className='more' onClick={this.LinkToPopularitySearchDetail}> 더보기 </div>
                        </div>
                        <div className='Info-list'>
                            {
                                this.state.searchList && this.state.searchList.length > 0 ?
                                    this.state.searchList.slice(0, 5).map((search, index) => {
                                        return (
                                        <div className='list'>
                                            <div className='list-num'> {index + 1}. </div>
                                            <div className='list-title'> {search.item} </div>
                                            <div className='list-content'> ₩ {search.currentPrice} </div>
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
        await getTopIndustries()
            .then(res => this.setState({ industryList: res }))
            .catch(err => alert('업종 상위 데이터가 없습니다.'));

        await getTopTheme()
            .then(res => this.setState({ themeList: res }))
            .catch(err => alert('테마 상위 데이터가 없습니다.'));

        await getPopularitySearch()
            .then(res => this.setState({ searchList: res }))
            .catch(err => alert('검색 상위 데이터가 없습니다.'));
    }

    private LinkToIndustryThemeDetail = () => {
        store.dispatch(push('/industryTheme'));
    }

    private LinkToPopularitySearchDetail = () => {
        store.dispatch(push('/popularitySearch'));
    }

}

export default Section1;
