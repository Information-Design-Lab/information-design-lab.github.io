<script>
	export const prerender = true;
	import '../app.scss';
	import Header from '$lib/components/Header.svelte';
</script>

<div class="container-xl">
	<Header />
	<slot />
</div>
