import axios from 'axios';
import { NasaSearchResponse } from './nasaTypes';

const BASE = 'https://images-api.nasa.gov';

export async function searchNasa(query: string, media_type = 'image') {
    const params: Record<string, string> = { q: query };
    if (media_type) params.media_type = media_type;

    const url = `${BASE}/search`;
    const res = await axios.get<NasaSearchResponse>(url, { params });
    return res.data.collection.items;
}

export async function getAsset(nasa_id: string) {
    const url = `${BASE}/asset/${encodeURIComponent(nasa_id)}`;
    const res = await axios.get(url);
    return res.data;
}
