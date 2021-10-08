import * as React from 'react';

import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';

import { getIndexOne } from '@app/apis/indexes';

// Stylesheet
import './IndexesDialog.scss';

type IndexesDialogProps = {
    indexData: any;
    closeDialog: Function;
};

type IndexesDialogState = {
    index: Array<any>;
};


class IndexesDialog extends React.Component<IndexesDialogProps, IndexesDialogState> {
    constructor(props: IndexesDialogProps) {
        super(props);
        this.state = {
            index: []
        };
    }

    componentDidMount() {
        this.callApiToFetch();
    }

    componentDidUpdate() {
        console.log('index', this.state.index);
    }

    render() {
        return (
            <div className='FinanceProject-IndexesDialog'>
                <div className='IndexesDialog-Background'></div>
                {
                    this.props.indexData ?

                    <Grow in={true}>
                    <div className='IndexesDialog-Content'>
                        <div className='Content-Title'>
                            <div className='Title-info'>
                                { this.props.indexData.ko} 정보
                            </div>
                        </div>
                        <div className='Content-Info'>

                            <div className='Info-Section1'>
                                <div className='Section1-Title'>
                                    <span className='Title-ko'> {this.props.indexData.ko} </span>
                                    <span className='Title-en'> {this.props.indexData.en} </span>
                                </div>
                                <img src={this.props.indexData.chart} className='chart' />
                            </div>

                            <div className='Info-Section2'>
                                <div className='Section2-Index'>
                                    <span className='Index-index' style={ this.props.indexData.blind === '상승' ? { color: 'red' } : this.props.indexData.blind === '하락' ? { color: 'blue' } : { color: 'black'} }>
                                        {this.props.indexData.index}
                                    </span>
                                    <span className='Index-detail' style={ this.props.indexData.blind === '상승' ? { color: 'red' } : this.props.indexData.blind === '하락' ? { color: 'blue' } : { color: 'black'} }>
                                        {this.props.indexData.blind === '상승' ? '▲ ' : this.props.indexData.blind === '하락' ? '▼ ' : '■ '}
                                        {this.props.indexData.detail}
                                    </span>
                                    <span className='Index-per' style={ this.props.indexData.blind === '상승' ? { color: 'red' } : this.props.indexData.blind === '하락' ? { color: 'blue' } : { color: 'black'} }>
                                        {this.props.indexData.per}
                                    </span>
                                </div>

                                <div className='Section2-Detail'>
                                    {
                                        this.state.index && this.state.index.length > 0 ?
                                        this.state.index.map(index => {
                                            return (
                                            <div className='Detail'>
                                                <div className='Detail-Info'>
                                                    <div className='Info-key'> {index.key_1} </div>
                                                    <div className='Info-value'> {index.value_1}</div>
                                                </div>
                                                <div className='Detail-Info'>
                                                    <div className='Info-key'> {index.key_2} </div>
                                                    <div className='Info-value'> {index.value_2}</div>
                                                </div>
                                            </div>
                                            );
                                        })
                                        : null
                                    }
                                </div>
                            </div>
                        </div>

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
        );
    }

    private callApiToFetch = async() => {
        getIndexOne(this.props.indexData.indexCode)
            .then(res => this.setState({ index: res }))
            .catch(err => alert('데이터가 없습니다.'));
    }
}

export default IndexesDialog;
