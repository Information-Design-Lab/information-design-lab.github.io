import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { dev } from '$app/environment';
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } from '$env/static/public';
import { getFile } from '@sanity/asset-utils';

const projectId = PUBLIC_SANITY_PROJECT_ID;
const dataset = PUBLIC_SANITY_DATASET;

export const client = createClient({
    projectId,
    dataset,
    apiVersion: '2023-06-28',
    useCdn: dev ? false : true
    //useCdn: false
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
    return builder.image(source);
};


export const getVideoUrl = (videoRef) => {
    if (!videoRef || !videoRef.asset) {
        return null;
    }
    return getFile(videoRef.asset, client.config()).asset.url;
};



