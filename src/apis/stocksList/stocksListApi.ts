import axios from 'axios';

/** Utils */
import { replaceIndexesDummyData, replaceListDummyData, replaceAllDummyData } from '@app/utils';

/** Model */
import { stockObject, topTrading, topIndustry, topTheme, popularitySearch, foreignStockMarget } from './stocksListApi.model';

/** get stocks list */
export function getStocksList(type?: string, page?: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {

        const el = document.createElement('body');
        const stocksList: stockObject[] = [];
        let url: string = '';

        if (type === 'KOSPI') {
            url = 'https://finance.naver.com/sise/sise_market_sum.naver?sosok=0&page=';
        } else if (type === 'KOSDAQ') {
            url = 'https://finance.naver.com/sise/sise_market_sum.naver?sosok=1&page=';
        }

        axios.get<any>(`${url}${page}`)
            .then(res => res.request)
            .then(res => res.responseText)
            .then(res => {
                el.innerHTML = res;
            })
            .then(async res => {
                /** get stcoks data */
                if (el.querySelectorAll('.box_type_l > .type_2 > tbody > tr') && el.querySelectorAll('.box_type_l > .type_2 > tbody > tr').length > 0) {

                    for (let i = 0; i < el.querySelectorAll('.box_type_l > .type_2 > tbody > tr').length - 1; i++) {

                        if (await replaceAllDummyData((el.querySelectorAll('.box_type_l > .type_2 > tbody > tr')[i] as HTMLElement).innerText) !== '') {

                            const innerText = await replaceListDummyData((el.querySelectorAll('.box_type_l > .type_2 > tbody > tr')[i] as HTMLElement).innerText);
                            const innerTextArr = innerText.split(' ');

                            /** data parsing */
                            if (innerTextArr.length === 14) {
                                const stockObject = {
                                    num: innerTextArr[1],
                                    item: innerTextArr[2],
                                    currentPrice: innerTextArr[3],
                                    comparedYester: innerTextArr[4],
                                    fluctuation: innerTextArr[5],
                                    par: innerTextArr[6],
                                    marketCapitalization: innerTextArr[7],
                                    numOfListedStocks: innerTextArr[8],
                                    foreignersProportion: innerTextArr[9],
                                    volume: innerTextArr[10],
                                    per: innerTextArr[11],
                                    roe: innerTextArr[12]
                                };

                                stocksList.push(stockObject);
                            }

                            else if (innerTextArr.length === 15) {
                                const stockObject = {
                                    num: innerTextArr[1],
                                    item: `${innerTextArr[2]} ${innerTextArr[3]}`,
                                    currentPrice: innerTextArr[4],
                                    comparedYester: innerTextArr[5],
                                    fluctuation: innerTextArr[6],
                                    par: innerTextArr[7],
                                    marketCapitalization: innerTextArr[8],
                                    numOfListedStocks: innerTextArr[9],
                                    foreignersProportion: innerTextArr[10],
                                    volume: innerTextArr[11],
                                    per: innerTextArr[12],
                                    roe: innerTextArr[13]
                                };

                                stocksList.push(stockObject);
                            }

                            else if (innerTextArr.length === 16) {
                                const stockObject = {
                                    num: innerTextArr[1],
                                    item: `${innerTextArr[2]} ${innerTextArr[3]} ${innerTextArr[4]}`,
                                    currentPrice: innerTextArr[5],
                                    comparedYester: innerTextArr[6],
                                    fluctuation: innerTextArr[7],
                                    par: innerTextArr[8],
                                    marketCapitalization: innerTextArr[9],
                                    numOfListedStocks: innerTextArr[10],
                                    foreignersProportion: innerTextArr[11],
                                    volume: innerTextArr[12],
                                    per: innerTextArr[13],
                                    roe: innerTextArr[14]
                                };

                                stocksList.push(stockObject);
                            }
                        }
                    }
                }
            })
            .then(() => {
                /** get stocks code */
                if (el.querySelectorAll('.box_type_l > .type_2 > tbody > tr') && el.querySelectorAll('.box_type_l > .type_2 > tbody > tr').length > 0) {

                    for (let i = 0; i < el.querySelectorAll('.box_type_l > .type_2 > tbody > tr').length - 1; i++) {
                        if (el.querySelectorAll('.box_type_l > .type_2 > tbody > tr > td > a.tltle')[i] as HTMLElement !== undefined) {
                            const indexCode = (el.querySelectorAll('.box_type_l > .type_2 > tbody > tr > td > a.tltle')[i] as HTMLElement).getAttribute('href');
                            stocksList[i].indexCode = indexCode.substring(indexCode.indexOf('=') + 1);
                        }
                    }
                }
            })
            .then(() => resolve(stocksList))
            .catch(reject);
    });
}

/** get top trading information */
export function getTopTrading(): Promise<any> {
    return new Promise<any>((resolve, reject) => {

        const el = document.createElement('body');
        const topTradingList: topTrading[] = [];

        axios.get<any>('https://finance.naver.com/')
            .then(res => res.request)
            .then(res => res.responseText)
            .then(res => {
                el.innerHTML = res;
            })
            .then(async res => {
                /** get top trading data */
                if (el.querySelectorAll('.article > .section > .section_sise_top > .group_type.is_active > .tbl_home > tbody > tr') &&
                    el.querySelectorAll('.article > .section > .section_sise_top > .group_type.is_active > .tbl_home > tbody > tr').length > 0) {

                    for (let i = 0; i < el.querySelectorAll('.article > .section > .section_sise_top > .group_type.is_active > .tbl_home > tbody > tr').length - 1; i++) {

                            const innerText = await replaceListDummyData(
                                    (el.querySelectorAll('.article > .section > .section_sise_top > .group_type.is_active > .tbl_home > tbody > tr')[i] as HTMLElement).innerText
                                );

                            const innerTextArr = innerText.split(' ');

                            /** data parsing */
                            if (innerTextArr.length === 7) {
                                const topTradingObject: topTrading = {
                                    item: innerTextArr[1],
                                    currentPrice: innerTextArr[2],
                                    updown : innerTextArr[3],
                                    comparedYester: innerTextArr[4],
                                    fluctuation: innerTextArr[5]
                                };

                                topTradingList.push(topTradingObject);
                            }

                            if (innerTextArr.length === 8) {
                                const topTradingObject: topTrading = {
                                    item: `${innerTextArr[1]} ${innerTextArr[2]}`,
                                    currentPrice: innerTextArr[3],
                                    updown : innerTextArr[4],
                                    comparedYester: innerTextArr[5],
                                    fluctuation: innerTextArr[6]
                                };

                                topTradingList.push(topTradingObject);
                            }

                            if (innerTextArr.length === 9) {
                                const topTradingObject: topTrading = {
                                    item: `${innerTextArr[1]} ${innerTextArr[2]} ${innerTextArr[3]}`,
                                    currentPrice: innerTextArr[4],
                                    updown : innerTextArr[5],
                                    comparedYester: innerTextArr[6],
                                    fluctuation: innerTextArr[7]
                                };

                                topTradingList.push(topTradingObject);
                            }
                    }
                }
            })
            .then(() => resolve(topTradingList))
            .catch(reject);
    });
}

/** get top industries information */
export function getTopIndustries(): Promise<any> {
    return new Promise<any>((resolve, reject) => {

        const el = document.createElement('body');
        let topIndustryList: topIndustry[] = [];

        axios.get<any>('https://finance.naver.com/sise/sise_group.naver?type=upjong')
            .then(res => res.request)
            .then(res => res.responseText)
            .then(res => {
                el.innerHTML = res;
            })
            .then(async res => {
                /** get top industries data */
                if (el.querySelectorAll('.type_1 > tbody > tr') &&
                    el.querySelectorAll('.type_1 > tbody > tr').length > 0) {

                    for (let i = 2; i < el.querySelectorAll('.type_1 > tbody > tr').length; i++) {

                        const innerText = await replaceListDummyData((el.querySelectorAll('.type_1 > tbody > tr')[i] as HTMLElement).innerText);

                        const innerTextArr = innerText.split(' ');

                        /** data parsing */
                        if (innerTextArr.length === 9) {
                            const topIndustries: any = {
                                item: innerTextArr[1],
                                fluctuation: innerTextArr[2]
                            };

                            topIndustryList.push(topIndustries);
                        }

                        if (innerTextArr.length === 10) {
                            const topIndustries: topIndustry = {
                                item: `${innerTextArr[1]} ${innerTextArr[2]}`,
                                fluctuation: innerTextArr[3]
                            };

                            topIndustryList.push(topIndustries);
                        }
                    }
                }
            })
            .then(() => {
                topIndustryList = topIndustryList.filter(x => x.item !== undefined);
            })
            .then(() => resolve(topIndustryList))
            .catch(reject);
    });
}

/** get top theme information */
export function getTopTheme(): Promise<any> {
    return new Promise<any>((resolve, reject) => {

        const el = document.createElement('body');
        const topThemeList: topTheme[] = [];

        axios.get<any>('https://finance.naver.com/sise/theme.naver')
            .then(res => res.request)
            .then(res => res.responseText)
            .then(res => {
                el.innerHTML = res;
            })
            .then(async res => {
                /** get top theme data */
                if (el.querySelectorAll('.type_1.theme > tbody > tr') &&
                    el.querySelectorAll('.type_1.theme > tbody > tr').length > 0) {

                    for (let i = 2; i < el.querySelectorAll('.type_1.theme > tbody > tr').length; i++) {

                        const innerText = await replaceListDummyData((el.querySelectorAll('.type_1.theme > tbody > tr')[i] as HTMLElement).innerText);

                        const innerTextArr = innerText.split(' ');

                        /** data parsing */
                        if (innerTextArr.length === 10) {
                            const topThemeObject: topTheme = {
                                item: innerTextArr[1],
                                fluctuation: innerTextArr[2]
                            };

                            topThemeList.push(topThemeObject);
                        }

                        if (innerTextArr.length === 11) {
                            const topThemeObject: topTheme = {
                                item: `${innerTextArr[1]} ${innerTextArr[2]}`,
                                fluctuation: innerTextArr[3]
                            };

                            topThemeList.push(topThemeObject);
                        }

                        if (innerTextArr.length === 12) {
                            const topThemeObject: topTheme = {
                                item: `${innerTextArr[1]} ${innerTextArr[2]} ${innerTextArr[3]}`,
                                fluctuation: innerTextArr[4]
                            };

                            topThemeList.push(topThemeObject);
                        }
                    }
                }
            })
            .then(() => resolve(topThemeList))
            .catch(reject);
    });
}

/** get popularity search information */
export function getPopularitySearch(): Promise<any> {
    return new Promise<any>((resolve, reject) => {

        const el = document.createElement('body');
        const popularitySearchList: popularitySearch[] = [];

        axios.get<any>('https://finance.naver.com/sise/lastsearch2.naver')
            .then(res => res.request)
            .then(res => res.responseText)
            .then(res => {
                el.innerHTML = res;
            })
            .then(async res => {
                /** get popularity search data */
                if (el.querySelectorAll('.type_5 > tbody > tr') &&
                    el.querySelectorAll('.type_5 > tbody > tr').length > 0) {

                    for (let i = 2; i < el.querySelectorAll('.type_5 > tbody > tr').length; i++) {

                        const innerText = await replaceListDummyData((el.querySelectorAll('.type_5 > tbody > tr')[i] as HTMLElement).innerText);

                        const innerTextArr = innerText.split(' ');

                        /** data parsing */
                        if (innerTextArr.length === 14) {
                            const popularitySearchObject: popularitySearch = {
                                num: innerTextArr[1],
                                item: innerTextArr[2],
                                rate: innerTextArr[3],
                                currentPrice: innerTextArr[4],
                                comparedYester: innerTextArr[5],
                                fluctuation: innerTextArr[6],
                                volume: innerTextArr[7],
                                marketPrice: innerTextArr[8],
                                highPrice: innerTextArr[9],
                                lowPrice: innerTextArr[10],
                                per: innerTextArr[11],
                                roe: innerTextArr[12]
                            };

                            popularitySearchList.push(popularitySearchObject);
                        }

                        if (innerTextArr.length === 15) {
                            const popularitySearchObject: popularitySearch = {
                                num: innerTextArr[1],
                                item: `${innerTextArr[2]} ${innerTextArr[3]}`,
                                rate: innerTextArr[4],
                                currentPrice: innerTextArr[5],
                                comparedYester: innerTextArr[6],
                                fluctuation: innerTextArr[7],
                                volume: innerTextArr[8],
                                marketPrice: innerTextArr[9],
                                highPrice: innerTextArr[10],
                                lowPrice: innerTextArr[11],
                                per: innerTextArr[12],
                                roe: innerTextArr[13]
                            };

                            popularitySearchList.push(popularitySearchObject);
                        }

                        if (innerTextArr.length === 16) {
                            const popularitySearchObject: popularitySearch = {
                                num: innerTextArr[1],
                                item: `${innerTextArr[2]} ${innerTextArr[3]} ${innerTextArr[4]}`,
                                rate: innerTextArr[5],
                                currentPrice: innerTextArr[6],
                                comparedYester: innerTextArr[7],
                                fluctuation: innerTextArr[8],
                                volume: innerTextArr[9],
                                marketPrice: innerTextArr[10],
                                highPrice: innerTextArr[11],
                                lowPrice: innerTextArr[12],
                                per: innerTextArr[13],
                                roe: innerTextArr[14]
                            };

                            popularitySearchList.push(popularitySearchObject);
                        }

                        if (innerTextArr.length === 17) {
                            const popularitySearchObject: popularitySearch = {
                                num: innerTextArr[1],
                                item: `${innerTextArr[2]} ${innerTextArr[3]} ${innerTextArr[4]} ${innerTextArr[5]}`,
                                rate: innerTextArr[6],
                                currentPrice: innerTextArr[7],
                                comparedYester: innerTextArr[8],
                                fluctuation: innerTextArr[9],
                                volume: innerTextArr[10],
                                marketPrice: innerTextArr[11],
                                highPrice: innerTextArr[12],
                                lowPrice: innerTextArr[13],
                                per: innerTextArr[14],
                                roe: innerTextArr[15]
                            };

                            popularitySearchList.push(popularitySearchObject);
                        }

                        if (innerTextArr.length === 18) {
                            const popularitySearchObject: popularitySearch = {
                                num: innerTextArr[1],
                                item: `${innerTextArr[2]} ${innerTextArr[3]} ${innerTextArr[4]} ${innerTextArr[5]} ${innerTextArr[6]}`,
                                rate: innerTextArr[7],
                                currentPrice: innerTextArr[8],
                                comparedYester: innerTextArr[9],
                                fluctuation: innerTextArr[10],
                                volume: innerTextArr[11],
                                marketPrice: innerTextArr[12],
                                highPrice: innerTextArr[13],
                                lowPrice: innerTextArr[14],
                                per: innerTextArr[15],
                                roe: innerTextArr[16]
                            };

                            popularitySearchList.push(popularitySearchObject);
                        }
                    }
                }
            })
            .then(() => {
                /** get stocks code */
                if (el.querySelectorAll('.type_5 > tbody > tr') && el.querySelectorAll('.type_5 > tbody > tr').length > 0) {

                    for (let i = 0; i < el.querySelectorAll('.type_5 > tbody > tr').length - 1; i++) {
                        if (el.querySelectorAll('.type_5 > tbody > tr > td > a.tltle')[i] as HTMLElement !== undefined) {
                            const indexCode = (el.querySelectorAll('.type_5 > tbody > tr > td > a.tltle')[i] as HTMLElement).getAttribute('href');
                            popularitySearchList[i].indexCode = indexCode.substring(indexCode.indexOf('=') + 1);
                        }
                    }
                }
            })
            .then(() => resolve(popularitySearchList))
            .catch(reject);
    });
}

/** get foreign stock marget information */
export function getForeignStockMarget(): Promise<any> {
    return new Promise<any>((resolve, reject) => {

        const el = document.createElement('body');
        const foreignStockMargetList: foreignStockMarget[] = [];

        axios.get<any>('https://finance.naver.com/')
            .then(res => res.request)
            .then(res => res.responseText)
            .then(res => {
                el.innerHTML = res;
            })
            .then(async res => {

                /** get foreign stock marget data */
                if (el.querySelectorAll('.aside > .group_aside > .aside_area.aside_stock > .tbl_home > tbody > tr') &&
                    el.querySelectorAll('.aside > .group_aside > .aside_area.aside_stock > .tbl_home > tbody > tr').length > 0) {

                    for (let i = 0; i < el.querySelectorAll('.aside > .group_aside > .aside_area.aside_stock > .tbl_home > tbody > tr').length; i++) {

                        const innerText = await replaceListDummyData((el.querySelectorAll('.aside > .group_aside > .aside_area.aside_stock > .tbl_home > tbody > tr')[i] as HTMLElement).innerText);

                        const innerTextArr = innerText.split(' ');

                        /** data parsing */
                        if (innerTextArr.length === 6) {
                            const popularitySearchObject: foreignStockMarget = {
                                item: innerTextArr[1],
                                currentIndex: innerTextArr[2],
                                updown: innerTextArr[3],
                                comparedYester: innerTextArr[4],

                            };

                            foreignStockMargetList.push(popularitySearchObject);
                        }

                        if (innerTextArr.length === 7) {
                            const popularitySearchObject: any = {
                                item: `${innerTextArr[1]} ${innerTextArr[2]}`,
                                currentIndex: innerTextArr[3],
                                updown: innerTextArr[4],
                                comparedYester: innerTextArr[5],

                            };

                            foreignStockMargetList.push(popularitySearchObject);
                        }
                    }
                }
            })
            .then(() => resolve(foreignStockMargetList))
            .catch(reject);
    });
}