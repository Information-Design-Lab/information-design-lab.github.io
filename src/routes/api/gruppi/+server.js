import { client } from '$lib/sanityClient';
import { getGruppi } from '$lib/sanityQueries';


export async function GET({ params, setHeaders, fetch }) {
    const data = await client.fetch(
        getGruppi(params.corsoId)
    );

    if (!data) {
        throw error(500, 'Database connection problem');
    }
    return json(data);
}


