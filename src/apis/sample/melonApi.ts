import axios from 'axios';

/* Utils */
import { replaceDummyText } from '@app/utils';

/* Store*/
import { logActions } from '@app/store/appLogs';
import store from '@app/store';

/* Model */
import { melonType } from './melonApi.model';

/* Get rank in melon url*/
export function getRankingInMelon(type: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        /* For Logs */
        store.dispatch(logActions.configCountCall(store.getState().appLogs.count.count + 1));

        const el = document.createElement('body');
        const melonArray = [];

        const src = typeCheckForSrc(type);

        axios.get<any>(src)
        .then(res => res.request)
        .then(res => res.responseText)
        .then(res => {
            el.innerHTML = res;
        })
        .then(async res => {
            if (el.querySelectorAll('tbody > tr') && el.querySelectorAll('tbody > tr').length > 0) {
                for (let i = 0; i < el.querySelectorAll('tr').length - 1; i++) {

                    const melonObject: melonType = {};

                    melonObject.title = await replaceDummyText((el.querySelectorAll('.wrap_song_info > .ellipsis.rank01 > span > a')[i] as HTMLElement).innerText);
                    melonObject.artist = await replaceDummyText((el.querySelectorAll('.wrap_song_info > .ellipsis.rank02 > .checkEllipsis')[i] as HTMLElement).innerText);
                    melonObject.album = await replaceDummyText((el.querySelectorAll('.wrap_song_info > .ellipsis.rank03 > a')[i] as HTMLElement).innerText);
                    melonObject.img = await `${(el.querySelectorAll('a.image_typeAll > img')[i] as HTMLElement).getAttribute('src')}`;

                    await melonArray.push(melonObject);
                }
            }
        })
        .then(res => store.dispatch(logActions.configSuccess(store.getState().appLogs.success.success + 1)))
        .then(res => resolve(melonArray))
        .catch(err => store.dispatch(logActions.configFail(store.getState().appLogs.fail.fail + 1)))
        .catch(reject);
    });
}

/* Input type after check */
function typeCheckForSrc (type: string) {
    let src: string = '';

    if (type === '24h') {
        src = 'https://www.melon.com/chart/index.htm';
    }

    if (type === 'day') {
        src = 'https://www.melon.com/chart/day/index.htm';
    }

    if (type === 'weekly') {
        src = 'https://www.melon.com/chart/week/index.htm';
    }

    if (type === 'monthly') {
        src = 'https://www.melon.com/chart/month/index.htm';
    }

    if (type === '발라드') {
        src = 'https://www.melon.com/genre/song_list.htm?gnrCode=GN0100';
    }

    if (type === '댄스') {
        src = 'https://www.melon.com/genre/song_list.htm?gnrCode=GN0200';
    }

    if (type === '랩/힙합') {
        src = 'https://www.melon.com/genre/song_list.htm?gnrCode=GN0300';
    }

    if (type === 'R&B/Soul') {
        src = 'https://www.melon.com/genre/song_list.htm?gnrCode=GN0400';
    }

    if (type === '인디음악') {
        src = 'https://www.melon.com/genre/song_list.htm?gnrCode=GN0500';
    }

    if (type === '록/메탈') {
        src = 'https://www.melon.com/genre/song_list.htm?gnrCode=GN0600';
    }

    if (type === '트로트') {
        src = 'https://www.melon.com/genre/song_list.htm?gnrCode=GN0700';
    }

    if (type === '포크/블루스') {
        src = 'https://www.melon.com/genre/song_list.htm?gnrCode=GN0800';
    }

    return src;
}