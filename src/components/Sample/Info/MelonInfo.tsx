import * as React from 'react';
import { RouteComponentProps } from 'react-router';

/* List for map() */
import { genreList, tabList, typeList } from './listForTab';

/* Api*/
import { getRankingInMelon } from '@app/apis/sample';

/* Model */
import { melonType } from '@app/apis/sample';

/* StyleSheet */
import './MelonInfo.scss';

type MelonInfoProps = {} & RouteComponentProps;

type MelonInfotStates = {
    /* Rank data */
    melon: melonType[];

    typeTab: string;

    /* For UI/UX*/
    saveTitleValue: string;
    currentTypeTab: string;
    currentLankTab: string;
};

class MelonInfo extends React.Component<MelonInfoProps, MelonInfotStates> {
    constructor(props: MelonInfoProps) {
        super(props);
        this.state = {
            melon: [],
            typeTab: 'melonChart',
            saveTitleValue: '',
            currentTypeTab: 'melonChart',
            currentLankTab: '24h'
        };
    }

    componentDidMount() {
        this.callMelonRankToApi();
    }

    componentDidUpdate() {
    }

    render() {

        return (
        <>
            <div className='FinanceProject-MelonInfo-Head'>

                <div className='FinanceProject-MelonInfo-Title'>
                    Melon
                </div>

                <div className='FinanceProject-MelonInfo-Search'>
                    <input
                        type='text'
                        className='Search-Info'
                        onChange={this.handleSearchValue}
                        placeholder=' 노래 제목을 검색하세요.'
                    >
                    </input>
                </div>

            </div>

            <div className='FinanceProject-MelonInfo'>
                <div className='MelonInfo-LankBox'>

                <div className='LankBox-TypeTab'>
                        {
                            typeList.map(tab => {
                                return (
                                    <div
                                        className='Tab-Info'
                                        style={this.state.currentTypeTab === tab.id ? { background: '#9bfbca' } : null}
                                        onClick={() => this.handleTypeTab(tab.id)}>
                                            {tab.name}
                                    </div>
                                );
                            })
                        }
                    </div>

                    <div className='LankBox-LankTab'>
                        {
                            this.state.typeTab === 'melonChart' ?
                                tabList.map(tab => {
                                    return (
                                        <div
                                            className='Tab-Info'
                                            style={this.state.currentLankTab === tab.id ? { background: '#59ffab' } : null}
                                            onClick={() => this.callMelonRankToApi(tab.id)}>
                                                {tab.name}
                                        </div>
                                    );
                                })
                            :

                            this.state.typeTab === 'Genre' ?
                                genreList.map(tab => {
                                    return (
                                        <div
                                            className='Tab-Info'
                                            style={this.state.currentLankTab === tab.id ? { background: '#59ffab' } : null}
                                            onClick={() => this.callMelonRankToApi(tab.id)}>
                                                {tab.name}
                                        </div>
                                    );
                                })

                            : null
                        }
                    </div>

                    <div className='LankBox-Title'>
                        <div className='Title-Info'> Title </div>
                        <div className='Title-Info'> Artist </div>
                        <div className='Title-Info'> Album </div>
                    </div>

                    <div className='LankBox-Contents'>

                        {
                            this.state.melon && this.state.melon.length > 0 ?
                                this.state.melon.filter(data => data.title.indexOf(this.state.saveTitleValue) !== -1).map(data => {
                                    return (
                                    <div className='Contents-Container'>

                                        <div className='Contents-Info'>
                                            <div className='Info-Image'> <img src={data.img} className='Image' /> </div>
                                            <div className='Info-Text'> {data.title} </div>
                                        </div>

                                        <div className='Contents-Info'>
                                            <div className='Info-Text'> {data.artist} </div>
                                        </div>

                                        <div className='Contents-Info'>
                                            <div className='Info-Text'> {data.album} </div>
                                        </div>
                                    </div>
                                    );
                                })
                            : null
                        }
                    </div>
                </div>
            </div>
        </>
        );
    }

    /* GET rank data */
    private callMelonRankToApi = (type?: string) => {
        if (type) {
            getRankingInMelon(type)
                .then(res => {
                    this.setState({
                        melon: res,
                        currentLankTab: type
                    });
                })
                .catch(err => alert(err));
        } else {
            getRankingInMelon('24h')
                .then(res => {
                    this.setState({ melon: res });
                })
                .catch(err => alert(err));
        }
    }

    /* handle tab for ui */
    private handleTypeTab = (type) => {
        this.setState({
            typeTab: type,
            currentTypeTab: type
        }, () => {

            if (type === 'melonChart') {
                this.callMelonRankToApi('24h');
            } else if (type === 'Genre') {
                this.callMelonRankToApi('발라드');
            } else {
                this.callMelonRankToApi(type);
            }

        });
    }


    private handleSearchValue = (e: React.ChangeEvent<{ value: any }>) => {
        this.setState({
            saveTitleValue: e.target.value
        });
    }
}

export default MelonInfo;