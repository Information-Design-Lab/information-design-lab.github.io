import { client } from '$lib/sanityClient';
import { getCorsi } from '$lib/sanityQueries';
import { json, error } from '@sveltejs/kit';

export async function GET({ params, setHeaders, fetch }) {
    const data = await client.fetch(
        `{
		"results":${getCorsi()},
  	}`
    );

    if (!data) {
        throw error(500, 'Database connection problem');
    }
    return json(data.results);
}