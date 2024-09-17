export async function load({ url, fetch }) {
    const corsi = await fetch(`/api/corsi`);
    return {
        corsi: await corsi.json()
    };
}