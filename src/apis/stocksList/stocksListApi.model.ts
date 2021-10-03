/* Model */
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
    num: string,
    item: string,
    rate: string,
    currentPrice: string,
    comparedYester: string,
    fluctuation: string,
    volume: string,
    marketPrice: string,
    highPrice: string,
    lowPrice: string,
    per: string,
    roe: string
};