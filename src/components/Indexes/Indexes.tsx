import * as React from 'react';

/** Component */
import IndexesDialog from './Dialog';

/** API */
import { getTodayIndexes, indexObjectType } from '@app/apis/indexes';

/** StyleSeet */
import './Indexes.scss';

/** States of `Indexes` component. */
type IndexestStates = {
    /** indexes array */
    indexes: indexObjectType[];
    /** for dialog */
    isVisible: boolean;
    /** index data */
    indexOne: Object;
};

/* Indexes Component */
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
        /** Call API */
        this.callApiToFetch();
    }

    render() {
        return (
        <>
        {
            /** dialog */
            this.state.isVisible ?
                <IndexesDialog
                    indexData={this.state.indexOne}
                    closeDialog={this.onDialog}
                />
            : null
        }
            <div className='FinanceProject-Indexes'>
                {/** dummy line */}
                <div className='Indexes-Dummy'/>
                {
                    this.state.indexes && this.state.indexes.length > 0 ?
                        this.state.indexes.map(index => {
                            return (
                                /** index information */
                                <div className='Indexes-Info' onClick={() => this.onDialog(true, index)}>

                                    {/** title of index */}
                                    <div className='Info-Title'>
                                        <span className='Title-ko'> {index.ko} </span>
                                        <span className='Title-en'> {index.en} </span>
                                    </div>
                                    {/** data of index */}
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
                                    {/** chart of index */}
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

    /** Call Api and fetch data */
    private callApiToFetch = async() => {
        await getTodayIndexes()
            .then(res => this.setState({ indexes: res }))
            .catch(err => console.error(err));
    }

    /** Controll Dialog */
    private onDialog = (check: boolean, data?: any) => {
        this.setState({ indexOne: data }, () => {
            this.setState({
                isVisible: check
            });
        });
    }

}

export default Indexes;