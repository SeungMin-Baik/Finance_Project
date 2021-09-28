export function replaceDummyText(text: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        try {
            const space = /\s/g;
            const enter = /\n/g;

            if (text.match(space)) {
                text = text.replace(/ /g, '');
            }

            if (text.match(enter)) {
                text = text.replace(/\n/g, '');
            }

            resolve(text);
        } catch (err) {
            reject(err => alert(err));
        }
    });
}