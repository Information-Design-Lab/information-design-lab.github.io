import { base } from '$app/paths';

export async function load({ url, fetch }) {
    const corsi = await fetch(`${base}/api/corsi`);
    const home = await fetch(`${base}/api/home`);
    return {
        corsi: await corsi.json(),
        home: await home.json()
    };
}