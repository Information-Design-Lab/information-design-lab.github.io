import { base } from '$app/paths';

export async function load({ url, fetch }) {
    const corsi = await fetch(`${base}/api/corsi`);
    return {
        corsi: await corsi.json()
    };
}