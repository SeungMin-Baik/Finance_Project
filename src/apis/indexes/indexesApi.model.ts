/* Model */
export type indexObjectType = {
    index: string;
    detail: string;
    per: string;
    blind: string;
    chart: any;
    en: string;
    ko: string;
};

export type stockObject = {
    num: string,
    item: string,
    currentPrice: string,
    comparedYester: string,
    fluctuation: string,
    par: string,
    marketCapitalization: string,
    numOfListedStocks: string,
    foreignersProportion: string,
    volume: string,
    per: string,
    roe: string
};

export type topTrading = {
    item: string,
    currentPrice: string,
    updown: string,
    comparedYester: string,
    fluctuation: string
};

export type topIndustry = {
    item: string,
    fluctuation: string
};

export type topTheme = {
    item: string,
    fluctuation: string
};

export type popularitySearch = {
    item: string,
    currentPrice: string
};