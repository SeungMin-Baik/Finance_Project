import * as React from 'react';

// API
import { getTopIndustries, getTopTheme } from '@app/apis/stocksList';

// Model
import { topIndustry, topTheme } from '@app/apis/stocksList';

// Stylesheets
import './IndustryThemeDetail.scss';


/** Props of `IndustryThemeDetail` component. */
type IndustryThemeDetailProps = {};

/** States of `IndustryThemeDetail` component. */
type IndustryThemeDetailStates = {
    industryList: topIndustry[];
    themeList: topTheme[];
};

/* Route IndustryThemeDetail */
class IndustryThemeDetail extends React.Component<IndustryThemeDetailProps, IndustryThemeDetailStates> {
    constructor(props: IndustryThemeDetailProps) {
        super(props);
        this.state = {
            industryList: [],
            themeList: [],
        };
    }

    componentDidMount() {
        this.callApiToFetch();
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <div className='FinanceProject-IndustryThemeDetail'>

                <div className='dummy-verticalLine' />

                <div className='IndustryThemeDetail-IndustryThemeList'>
                    <div className='IndustryThemeList-Header' style={{color: '#000089'}}>
                        업종별 시세
                    </div>

                    <div className='IndustryThemeList-Title'>
                        <div className='Title-Info'> 업종명 </div>
                        <div className='Title-Info'> 전일대비 </div>
                    </div>

                    <div className='dummy-horizenLine' />

                    <div className='IndustryThemeList-Body'>
                    {
                        this.state.industryList && this.state.industryList.length > 0 ?
                            this.state.industryList.map(industry => {
                                return (
                                <>
                                <div className='Body-Info'>
                                    <div className='Info-text'> {industry.item} </div>
                                    <div className='Info-text' style={industry.fluctuation.substring(0, 1) === '+' ? {color: 'red'}
                                                                : industry.fluctuation.substring(0, 1) === '-' ? {color: 'blue'}
                                                                : {color: 'black'}}>
                                        {industry.fluctuation}
                                    </div>
                                </div>
                                <div className='dummy-horizenLine' />
                                </>
                                );
                            })
                        : null
                    }
                    </div>
                </div>

                <div className='dummy-verticalLine' />

                <div className='IndustryThemeDetail-IndustryThemeList'>
                    <div className='IndustryThemeList-Header' style={{color: '#466b8b'}}>
                        테마별 시세
                    </div>

                    <div className='IndustryThemeList-Title'>
                        <div className='Title-Info'> 테마명 </div>
                        <div className='Title-Info'> 전일대비 </div>
                    </div>

                    <div className='dummy-horizenLine' />

                    <div className='IndustryThemeList-Body'>
                    {
                        this.state.themeList && this.state.themeList.length > 0 ?
                            this.state.themeList.map(theme => {
                                return (
                                <>
                                <div className='Body-Info'>
                                    <div className='Info-text'> {theme.item} </div>
                                    <div className='Info-text' style={theme.fluctuation.substring(0, 1) === '+' ? {color: 'red'}
                                                                : theme.fluctuation.substring(0, 1) === '-' ? {color: 'blue'}
                                                                : {color: 'black'}}>
                                        {theme.fluctuation}
                                    </div>
                                </div>
                                <div className='dummy-horizenLine' />
                                </>
                                );
                            })
                        : null
                    }
                    </div>
                </div>

                <div className='dummy-verticalLine' />
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
    }
}

export default IndustryThemeDetail;
