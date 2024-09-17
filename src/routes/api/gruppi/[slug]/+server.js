import { error, json } from '@sveltejs/kit';
import { client } from '$lib/sanityClient';
import { getGruppi } from '$lib/sanityQueries';

export async function GET({ params }) {
    const { slug } = params;

    const query = getGruppi(slug);
    const gruppo = await client.fetch(query);

    if (!gruppo || gruppo.length === 0) {
        throw error(404, 'Gruppo non trovato');
    }

    return json(gruppo[0]);
}
