import axios from 'axios';

/* Utils */
import { replaceDummyText } from '@app/utils';

/* Store*/
import store from '@app/store';

/* Model */
import { indexesObjectType } from './IndexesApi.model';

export function getTodayIndexes(): Promise<any> {
    return new Promise<any>((resolve, reject) => {

        const el = document.createElement('body');
        const indexesArray: indexesObjectType[] = [];

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
                const indexesObject: indexesObjectType = {
                    index: await replaceDummyText((el.querySelector(`.article > .section2 > .section_stock_market > .section_stock > ${indexesType[i].class} > .heading_area > a > .num_quot.up > .num`) as HTMLElement).innerText),
                    detail: await replaceDummyText((el.querySelector(`.article > .section2 > .section_stock_market > .section_stock > ${indexesType[i].class} > .heading_area > a > .num_quot.up > .num2`) as HTMLElement).innerText),
                    per: await replaceDummyText((el.querySelector(`.article > .section2 > .section_stock_market > .section_stock > ${indexesType[i].class} > .heading_area > a > .num_quot.up > .num3`) as HTMLElement).innerText),
                    blind: await replaceDummyText((el.querySelector(`.article > .section2 > .section_stock_market > .section_stock > ${indexesType[i].class} > .heading_area > a > .num_quot.up > .blind`) as HTMLElement).innerText),
                    chart: await `${(el.querySelector(`.article > .section2 > .section_stock_market > .section_stock > ${indexesType[i].class} > .chart_area > a > img`) as HTMLElement).getAttribute('src')}`,
                    en: indexesType[i].en,
                    ko: indexesType[i].ko
                };

                await indexesArray.push(indexesObject);
            }
        })
        .then(res => resolve(indexesArray))
        .catch(reject);
    });
}
