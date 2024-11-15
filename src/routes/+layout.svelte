<script>
	import '../app.scss';
	import Header from '$lib/components/Header.svelte';
</script>

<svelte:head>
	<meta property="og:title" content="Information design lab" />
	<meta property="og:type" content="website" />
	<meta property="og:URL" content="hhttps://information-design-lab.github.io/" />
	<meta property="og:image" content="https://information-design-lab.github.io/social-media.jpg" />
	<meta
		property="og:description"
		content="
Il laboratorio di Information Design è un corso del Master in Interaction Design dell'Università di San Marino che ha l'obiettivo di introdurre gli studenti ai concetti teorici e pratici realtivi alla visualizzazione dei dati e delle informazioni."
	/>
</svelte:head>

<div
	style="min-height: 100vh;"
	class="container-fluid p-0 p-sm-0 d-flex flex-column justify-content-between"
>
	<Header />
	<slot />
</div>
