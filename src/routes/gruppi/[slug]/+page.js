export async function load({ params, fetch }) {
    const { slug } = params;
    const response = await fetch(`/api/gruppi/${slug}`);
    const gruppo = await response.json();

    return { gruppo };
}
