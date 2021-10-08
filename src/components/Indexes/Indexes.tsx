import * as React from 'react';
import { Switch, Route } from 'react-router';

import IndexesDialog from './Dialog';

// API
import { getTodayIndexes, indexObjectType } from '@app/apis/indexes';

// StyleSeet
import './Indexes.scss';

type IndexestStates = {
    indexes: indexObjectType[];
    isVisible: boolean;
    indexOne: any;
};

/* Route Indexes*/
class Indexes extends React.Component<{}, IndexestStates> {
    constructor(props: {}) {
        super(props);
        this.state = {
            indexes: [],
            isVisible: false,
            indexOne: {}
        };
    }

    componentDidMount() {
        this.callApiToFetch();
    }

    componentDidUpdate() {
    }

    render() {
        return (
        <>
        {
            this.state.isVisible ?
                <IndexesDialog
                    indexData={this.state.indexOne}
                    closeDialog={this.onDialog}
                />
            : null
        }
            <div className='FinanceProject-Indexes'>
                <div className='Indexes-Dummy'/>
                {
                    this.state.indexes && this.state.indexes.length > 0 ?
                        this.state.indexes.map(index => {
                            return (
                                <div className='Indexes-Info' onClick={() => this.onDialog(true, index)}>

                                    <div className='Info-Title'>
                                        <span className='Title-ko'> {index.ko} </span>
                                        <span className='Title-en'> {index.en} </span>
                                    </div>

                                    <div className='Info-Index'>
                                        <span className='Index-index' style={ index.blind === '상승' ? { color: 'red' } : index.blind === '하락' ? { color: 'blue' } : { color: 'black'} }>
                                            {index.index}
                                        </span>
                                        <span className='Index-detail' style={ index.blind === '상승' ? { color: 'red' } : index.blind === '하락' ? { color: 'blue' } : { color: 'black'} }>
                                            {index.blind === '상승' ? '▲ ' : index.blind === '하락' ? '▼ ' : '■ '}
                                            {index.detail}
                                        </span>
                                        <span className='Index-per' style={ index.blind === '상승' ? { color: 'red' } : index.blind === '하락' ? { color: 'blue' } : { color: 'black'} }>
                                            {index.per}
                                        </span>
                                    </div>

                                    <div className='Info-Chart'>
                                        <img src={index.chart} className='chart' />
                                    </div>
                                </div>
                            );
                        })
                    : <div> data err </div>
                }
            </div>
        </>
        );
    }

    private callApiToFetch = async() => {
        await getTodayIndexes()
            .then(res => this.setState({ indexes: res }))
            .catch(err => console.error(err));
    }

    private onDialog = (check: boolean, data?: any) => {
        this.setState({ indexOne: data }, () => {
            this.setState({
                isVisible: check
            });
        });
    }

}

export default Indexes;