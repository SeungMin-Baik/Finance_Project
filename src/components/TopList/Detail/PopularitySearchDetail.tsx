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
    constructor(props: PopularitySearchDetailProps) {
        super(props);
        this.state = {
            searchList: []
        };
    }

    componentDidMount() {
        this.callApiToFetch();
    }

    render() {
        return (
            <div className='FinanceProject-PopularitySearchDetail'>
                PopularitySearchDetail
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
