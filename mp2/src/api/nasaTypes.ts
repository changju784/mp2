export interface NasaItemLink {
    href: string;
}

export interface NasaDataItem {
    title: string;
    nasa_id: string;
    date_created: string;
    description?: string;
    photographer?: string;
}

export interface NasaCollectionItem {
    data: NasaDataItem[];
    links?: { href: string; rel?: string; render?: string }[];
}

export interface NasaSearchResponse {
    collection: {
        items: NasaCollectionItem[];
        metadata?: any;
    };
}
