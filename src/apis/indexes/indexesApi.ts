import axios from 'axios';

/** Utils */
import { replaceIndexesDummyData, replaceListDummyData, replaceAllDummyData } from '@app/utils';


/** Model */
import { indexObjectType } from './indexesApi.model';

/** get today's kospi, kosdaq, kospi 200 information */
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
                    { class: '.kospi_area.group_quot.quot_opn', en: 'KOSPI', ko: '코스피', code: 'KOSPI' },
                    { class: '.kosdaq_area.group_quot', en: 'KOSDAQ', ko: '코스닥', code: 'KOSDAQ'},
                    { class: '.kospi200_area.group_quot', en: 'KOSPI 200', ko: '코스피 200', code: 'KPI200'}
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
                        ko: indexesType[i].ko,
                        indexCode: indexesType[i].code
                    };

                    await indexesArray.push(indexesObject);
                }
            })
            .then(() => resolve(indexesArray))
            .catch(reject);
    });
}

/** get today's one of kospi, kosdaq, or kospi 200 */
export function getIndexOne(code: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {

        const el = document.createElement('body');
        const indexOneArray: any = [];

        axios.get<any>(`https://finance.naver.com/sise/sise_index.naver?code=${code}`)
            .then(res => res.request)
            .then(res => res.responseText)
            .then(res => {
                el.innerHTML = res;
            })
            .then(async res => {

                if (el.querySelectorAll('.inner_sub > .subtop_sise_detail > table > tbody > tr') &&
                    el.querySelectorAll('.inner_sub > .subtop_sise_detail > table > tbody > tr').length > 0) {

                    for (let i = 0; i < el.querySelectorAll('.inner_sub > .subtop_sise_detail > table > tbody > tr').length; i++) {

                        const innerText = await replaceListDummyData((el.querySelectorAll('.inner_sub > .subtop_sise_detail > table > tbody > tr')[i] as HTMLElement).innerText);

                        const innerTextArr = innerText.split(' ');

                        if (innerTextArr.length === 6) {
                            const indexObject: any = {
                                key_1: innerTextArr[1],
                                value_1: innerTextArr[2],
                                key_2: innerTextArr[3],
                                value_2: innerTextArr[4]
                            };

                            await indexOneArray.push(indexObject);
                        }
                    }
                }
            })
            .then(() => resolve(indexOneArray))
            .catch(reject);
    });
}
