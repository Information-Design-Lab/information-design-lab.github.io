import { base } from '$app/paths';

export async function load({ params, fetch }) {
    const { slug } = params;
    const response = await fetch(`${base}/api/gruppo/${slug}`);
    const gruppo = await response.json();
    for (let proj in gruppo.progetti) {
        if (gruppo.progetti[proj].immagini === null) {
            gruppo.progetti[proj].immagini = [];
        }
    }
    return { gruppo };
}
