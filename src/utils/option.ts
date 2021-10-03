export function replaceAllDummyData(text: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        try {
            const space = / /g;
            const enter = /\n/g;
            const tab = /\t/g;

            if (text.match(space)) {
                text = text.replace(space, '');
            }

            if (text.match(enter)) {
                text = text.replace(enter, '');
            }

            if (text.match(tab)) {
                text = text.replace(tab, '');
            }

            resolve(text);
        } catch (err) {
            reject(err => alert(err));
        }
    });
}

export function replaceIndexesDummyData(text: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        try {
            const doubleSpace = /  /g;
            const enter = /\n/g;

            if (text.match(doubleSpace)) {
                text = text.replace(doubleSpace, '');
            }

            if (text.match(enter)) {
                text = text.replace(enter, '');
            }

            resolve(text);
        } catch (err) {
            reject(err => alert(err));
        }
    });
}

export function replaceListDummyData(text: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        try {

            const result =
                text
                .replace(/\n/g, ' ')
                .replace(/\t/g, '')
                .replace(/(\s)+/g, ' ');

            resolve(result);
        } catch (err) {
            reject(err => alert(err));
        }
    });
}
