<script>
	import '../app.scss';
	import Header from '$lib/components/Header.svelte';
</script>

<div class="container-fluid">
	<Header />
	<slot />
</div>
