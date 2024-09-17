export async function load({ params, fetch }) {
    const { slug } = params;
    const response = await fetch(`/api/corsi/${slug}`);
    const corso = await response.json();

    return { corso };
}
