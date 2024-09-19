<script>
	import '../app.scss';
	import Header from '$lib/components/Header.svelte';
</script>

<div class="container-xxl">
	<Header />
	<slot />
</div>
