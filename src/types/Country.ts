interface Translations {
    [key: string]: {
        official: string;
        common: string;
    };
}

interface Demonyms {
    eng: {
        f: string;
        m: string;
    };
    fra: {
        f: string;
        m: string;
    };
}

interface Currencies {
    [key: string]: {
        name: string;
        symbol: string;
    };
}

interface Maps {
    googleMaps: string;
    openStreetMaps: string;
}

interface Flag {
    png: string;
    svg: string;
    alt: string;
}

interface CoatOfArms {
    png: string;
    svg: string;
}

export interface Country {
    name: {
        common: string;
        official: string;
        nativeName: {
            [key: string]: {
                official: string;
                common: string;
            };
        };
    };
    tld: string[];
    cca2: string;
    ccn3: string;
    cca3: string;
    cioc: string;
    independent: boolean;
    status: string;
    unMember: boolean;
    currencies: Currencies;
    idd: {
        root: string;
        suffixes: string[];
    };
    capital: string[];
    altSpellings: string[];
    region: string;
    subregion: string;
    languages: {
        [key: string]: string;
    };
    translations: Translations;
    latlng: [number, number];
    landlocked: boolean;
    area: number;
    demonyms: Demonyms;
    flag: string;
    maps: Maps;
    population: number;
    fifa: string;
    car: {
        signs: string[];
        side: string;
    };
    timezones: string[];
    continents: string[];
    flags: Flag;
    coatOfArms: CoatOfArms;
    startOfWeek: string;
    capitalInfo: {
        latlng: [number, number];
    };
}
