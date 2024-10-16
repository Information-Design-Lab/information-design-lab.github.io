<script>
	import '../app.scss';
	import Header from '$lib/components/Header.svelte';
</script>

<div
	style="min-height: 100vh;"
	class="container-fluid p-0 p-sm-0 d-flex flex-column justify-content-between"
>
	<Header />
	<slot />
</div>
