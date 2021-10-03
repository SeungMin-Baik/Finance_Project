import axios from 'axios';

/* Utils */
import { replaceIndexesDummyData, replaceListDummyData, replaceAllDummyData } from '@app/utils';

/* Store*/
import store from '@app/store';

/* Model */
import { indexObjectType, stockObject, topTrading, topIndustry, topTheme, popularitySearch } from './indexesApi.model';

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
