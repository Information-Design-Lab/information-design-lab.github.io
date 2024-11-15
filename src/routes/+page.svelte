<script>
	import { base } from '$app/paths';
	import { createSquareAtMouse } from '$lib/cursorEffect.js';
	import { PortableText } from '@portabletext/svelte';

	const page = $props();
	const corsi = $derived(page.data.corsi);
	const home = $derived(page.data.home);
	let firstContainer;

	let firstParagraph = $derived([home.descrizione[0]]);
	let remainingParagraphs = $derived(home.descrizione.slice(1));

	$inspect(home);
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

<div class="container-fluid my-4 flex-grow-1" bind:this={firstContainer}>
	<div class="row">
		<div class="col-12 fs-1 fw-semibold">
			<PortableText value={firstParagraph} />
		</div>
	</div>
	<div class="row my-4">
		<div class="col-md-3 col-sm-12 mb-4 mt-2 sidebar">
			<PortableText value={home.info} />
		</div>
		<div class="col-md-8 col-sm-12 home-main fw-semibold">
			<PortableText value={remainingParagraphs} />
		</div>
	</div>
</div>

<div class="container-fluid my-4" id="course-list">
	{#each corsi as corso, index}
		<div
			class="row py-2"
			class:border-top={index !== 0}
			class:border-bottom={index !== corsi.length - 1}
		>
			<div class="col-12">
				<h1 class="d-flex align-items-start gap-3">
					<a href="{base}/corsi/{corso.slug.current}" class="text-decoration-none text-white">
						<span
							class="course-title fs-big fw-normal text-uppercase"
							style="transition: all 0.3s ease-in-out; --color: {'#' + corso.colore}"
							>{corso.titolo}</span
						>
					</a>
					<span
						class="fw-semibold badge rounded-pill text-white fs-6 mt-3 py-1 px-2"
						style="box-shadow: inset 0 0 4px 2px {'#' + corso.colore}, 0 0 4px 2px {'#' +
							corso.colore}; 
						border: 1px solid {'#' + corso.colore}; background-color: {'#' + corso.colore}">{corso.anno}</span
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
		font-size: 1.5rem;
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
		margin-top: 2em;
	}
	.sidebar :global(h6) {
		font-size: 1rem;
		color: #666666;
	}
	.fs-big {
		font-size: 4rem;
	}
	.course-title:hover {
		filter: blur(2px);
		color: var(--color);
	}
	@media (max-width: 768px) {
		.fs-big {
			font-size: 2rem;
		}
	}
</style>
