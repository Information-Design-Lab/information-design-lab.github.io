import { error, json } from '@sveltejs/kit';
import { client } from '$lib/sanityClient';
import { getHome } from '$lib/sanityQueries';
export const prerender = true;
export async function GET() {

    const query = getHome();
    const home = await client.fetch(query);

    if (!home) {
        throw error(404, 'Home non trovata');
    }

    return json(home);
}
