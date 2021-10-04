import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router';

// Component
import Section1 from './Section1';
import Section2 from './Section2';

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
    }

    render() {
        return (
            <div className='FinanceProject-TopList'>
                <Section1 />
                <Section2 />
            </div>
        );
    }
}

export default TopList;
