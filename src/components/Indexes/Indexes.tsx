import * as React from 'react';
import { Switch, Route } from 'react-router';

// API
import { getTodayIndexes, indexObjectType } from '@app/apis/finance';

// StyleSeet
import './Indexes.scss';

type IndexestStates = {
    indexes: indexObjectType[];
};

/* Route Indexes*/
class Indexes extends React.Component<{}, IndexestStates> {
    constructor(props: {}) {
        super(props);
        this.state = {
            indexes: []
        };
    }

    componentDidMount() {
        this.callApiToFetch();
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <div className='FinanceProject-Indexes'>
                <div className='Indexes-Dummy'/>
                {
                    this.state.indexes && this.state.indexes.length > 0 ?
                        this.state.indexes.map(index => {
                            return (
                                <div className='Indexes-Info'>

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
        );
    }

    private callApiToFetch = async() => {
        await getTodayIndexes()
            .then(res => this.setState({ indexes: res }))
            .catch(err => console.error(err));
    }

}

export default Indexes;