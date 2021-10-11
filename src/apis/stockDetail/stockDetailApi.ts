import axios from 'axios';

/* Utils */
import { replaceListDummyData } from '@app/utils';


/* Model */



export function getStockOne(code: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {

        const el = document.createElement('body');
        const stockArray: any[] = [];

        axios.get<any>(`https://finance.naver.com/item/main.naver?code=${code}`)
            .then(res => res.request)
            .then(res => res.responseText)
            .then(res => {
                el.innerHTML = res;
            })
            .then(async res => {

                let stockObject: any = {};

                stockObject = {
                    chart: await `${(el.querySelector('.spot > .chart > img') as HTMLElement).getAttribute('src')}`
                };

                await stockArray.push(stockObject);

                if (el.querySelectorAll('.aside_invest_info > .tab_con1 > .first > table > tbody > tr') &&
                    el.querySelectorAll('.aside_invest_info > .tab_con1 > .first > table > tbody > tr').length > 0) {

                    for (let i = 0; i < el.querySelectorAll('.aside_invest_info > .tab_con1 > .first > table > tbody > tr').length; i++) {

                        const innerText = await replaceListDummyData((el.querySelectorAll('.aside_invest_info > .tab_con1 > .first > table > tbody > tr')[i] as HTMLElement).innerText);

                        const innerTextArr = innerText.split(' ');

                        let stockObject: any = {};

                        if (innerTextArr.length === 4) {
                            stockObject = {
                                key_1: innerTextArr[1],
                                value_1: `${innerTextArr[2]} ${innerTextArr[3]}`
                            };
                        }

                        if (innerTextArr.length === 5) {
                            stockObject = {
                                key_1: innerTextArr[0],
                                value_1: `${innerTextArr[1]} ${innerTextArr[2]} ${innerTextArr[3]}`
                            };
                        }

                        if (innerTextArr.length === 6) {
                            stockObject = {
                                key_1: innerTextArr[1],
                                value_1: `${innerTextArr[2]} ${innerTextArr[3]} ${innerTextArr[4]}`
                            };
                        }

                        await stockArray.push(stockObject);
                    }
                }

                if (el.querySelectorAll('.aside_invest_info > .tab_con1 > .gray > table > tbody > tr') &&
                el.querySelectorAll('.aside_invest_info > .tab_con1 > .gray > table > tbody > tr').length > 0) {

                    for (let i = 0; i < el.querySelectorAll('.aside_invest_info > .tab_con1 > .gray > table > tbody > tr').length; i++) {

                        const innerText = await replaceListDummyData((el.querySelectorAll('.aside_invest_info > .tab_con1 > .gray > table > tbody > tr')[i] as HTMLElement).innerText);

                        const innerTextArr = innerText.split(' ');

                        let stockObject: any = {};

                        if (innerTextArr.length === 4) {
                            stockObject = {
                                key_1: innerTextArr[1],
                                value_1: `${innerTextArr[2]} ${innerTextArr[3]}`
                            };
                        }

                        if (innerTextArr.length === 5) {
                            stockObject = {
                                key_1: `${innerTextArr[1]} ${innerTextArr[2]}`,
                                value_1: innerTextArr[3]
                            };
                        }

                        if (innerTextArr.length === 30) {
                            stockObject = {
                                key_1: innerTextArr[1],
                                value_1: innerTextArr[28]
                            };
                        }

                        await stockArray.push(stockObject);
                    }
                }
            })
            .then(() => resolve(stockArray))
            .catch(reject);
    });
}