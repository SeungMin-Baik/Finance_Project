import axios from 'axios';

/* Utils */
import { replaceIndexesDummyData, replaceStocksListDummyData, replaceAllDummyData } from '@app/utils';

/* Store*/
import store from '@app/store';

/* Model */
import { indexObjectType, stockObject } from './financeApi.model';

export function getTodayIndexes(): Promise<any> {
    return new Promise<any>((resolve, reject) => {

        const el = document.createElement('body');
        const indexesArray: indexObjectType[] = [];

        axios.get<any>('https://finance.naver.com/')
            .then(res => res.request)
            .then(res => res.responseText)
            .then(res => {
                el.innerHTML = res;
            })
            .then(async res => {

                const indexesType = [
                    { class: '.kospi_area.group_quot.quot_opn', en: 'KOSPI', ko: '코스피' },
                    { class: '.kosdaq_area.group_quot', en: 'KOSDAQ', ko: '코스닥'},
                    { class: '.kospi200_area.group_quot', en: 'KOSPI 200', ko: '코스피 200'}
                ];

                for (let i = 0; i < indexesType.length; i++) {

                    const innerText = await replaceIndexesDummyData(
                        (el.querySelector(`.article > .section2 > .section_stock_market > .section_stock > ${indexesType[i].class} > .heading_area > a`) as HTMLElement).innerText
                    );
                    const innerTextArr = innerText.split(' ');

                    const indexesObject: indexObjectType = {
                        index: innerTextArr[0],
                        detail: innerTextArr[1],
                        per: innerTextArr[2],
                        blind: innerTextArr[3],
                        chart: await `${(el.querySelector(`.article > .section2 > .section_stock_market > .section_stock > ${indexesType[i].class} > .chart_area > a > img`) as HTMLElement).getAttribute('src')}`,
                        en: indexesType[i].en,
                        ko: indexesType[i].ko
                    };

                    await indexesArray.push(indexesObject);
                }
            })
            .then(() => resolve(indexesArray))
            .catch(reject);
    });
}

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
                if (el.querySelectorAll('.box_type_l > .type_2 > tbody > tr') && el.querySelectorAll('.box_type_l > .type_2 > tbody > tr').length > 0) {

                    for (let i = 0; i < el.querySelectorAll('.box_type_l > .type_2 > tbody > tr').length - 1; i++) {

                        if (await replaceAllDummyData((el.querySelectorAll('.box_type_l > .type_2 > tbody > tr')[i] as HTMLElement).innerText) !== '') {

                            const innerText = await replaceStocksListDummyData((el.querySelectorAll('.box_type_l > .type_2 > tbody > tr')[i] as HTMLElement).innerText);
                            const innerTextArr = innerText.split(' ');

                            const stockObject: stockObject = {
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

                            await stocksList.push(stockObject);
                        }
                    }
                }
            })
            .then(() => resolve(stocksList))
            .catch(reject);
    });
}