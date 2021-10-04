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

    render() {
        return (
            <div className='FinanceProject-IndustryThemeDetail'>
                IndustryThemeDetail
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
