import { base } from '$app/paths';

export async function load({ params, fetch }) {
    const { slug } = params;
    const response = await fetch(`${base}/api/corso/${slug}`);
    const corso = await response.json();

    return { corso };
}
