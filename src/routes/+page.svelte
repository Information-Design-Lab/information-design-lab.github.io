<script>
	import { base } from '$app/paths';
	import { createSquareAtMouse } from '$lib/cursorEffect.js';
	import { PortableText } from '@portabletext/svelte';

	const page = $props();
	const corsi = $derived(page.data.corsi);
	const home = $derived(page.data.home);
	let firstContainer;

	$effect(() => {
		if (!firstContainer) return;

		const handleMouseMove = (event) => {
			const rect = firstContainer.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
				createSquareAtMouse(event.clientX, event.clientY);
			}
		};

		firstContainer.addEventListener('mousemove', handleMouseMove);

		return () => {
			firstContainer.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<div class="container-fluid mt-2" bind:this={firstContainer}>
	<div class="row justify-content-between">
		<div class="col-md-7 col-sm-12 home-main">
			<PortableText value={home.descrizione} />
		</div>
		<div class="col-md-4 col-sm-12 mt-2 sidebar">
			<PortableText value={home.info} />
			<!--<div class="mb-4">
				<h6 class="fw-normal">SUPERVISIONE</h6>
				<p class="mb-0 fw-semibold">Giorgio Uboldi</p>
				<p class="mb-0 fw-semibold">Marco Luitprandi</p>
			</div>
			<div class="mb-4">
				<h6 class="fw-normal">LAUREA MAGISTRALE</h6>
				<a href="https://design.unirsm.sm/magistrale/presentazione/" class="fw-semibold fs-5">
					Interaction & Experience Design
				</a>
			</div>
			<div class="mb-4">
				<h6 class="fw-normal">UNIVERSITÀ</h6>
				<a href="https://www.unirsm.sm/" class="fw-semibold fs-5"> Repubblica di San Marino </a>
			</div>
			<div class="text-light">
				<p class="mb-0 fs-6">Design by Alessandra Valentini</p>
				<p class="mb-0 mt-0 fs-6">Development by Daniele Ciminieri (Calibro)</p>
			</div>-->
		</div>
	</div>
</div>

<div class="container-fluid mt-4">
	{#each corsi as corso, index}
		<div
			class="row py-2"
			class:border-top={index !== 0}
			class:border-bottom={index !== corsi.length - 1}
		>
			<div class="col-12">
				<h1 class="d-flex align-items-center gap-3">
					<a href="{base}/corsi/{corso.slug.current}" class="text-decoration-none text-white">
						<span class="fw-normal text-uppercase">{corso.titolo}</span>
					</a>
					<span
						class="fw-semibold badge rounded-pill text-white border border-white fs-6 mt-2"
						style="background-color: {'#' + corso.colore}">{corso.anno}</span
					>
				</h1>
			</div>
		</div>
	{/each}
</div>

<style>
	p {
		font-size: 1.25rem;
	}
	.home-main :global(p) {
		font-size: 1.75rem;
	}
	.sidebar :global(ul) {
		list-style: none;
		padding-left: 0;
		font-size: 1.25rem;
	}
	.sidebar :global(a) {
		font-size: 1.25rem;
	}
	.sidebar :global(h5:first-of-type) {
		margin-top: 0;
	}
	.sidebar :global(h6:first-of-type) {
		margin-top: 2rem;
	}
	.sidebar :global(h5) {
		font-size: 1rem;
		margin-top: 1.5em;
	}
	.sidebar :global(h6) {
		font-size: 1rem;
		color: #666666;
	}
</style>
