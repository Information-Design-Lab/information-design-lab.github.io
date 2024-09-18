<script>
	import { base } from '$app/paths';
	import DataProject from '$lib/components/DataProject.svelte';
	import ExperienceProject from '$lib/components/ExperienceProject.svelte';
	import { goto } from '$app/navigation';
	const { data } = $props();

	$inspect(data);
	const sortedProjects = $derived(
		data.gruppo.progetti.sort((a, b) => {
			if (a.modulo < b.modulo) return -1;
			if (a.modulo > b.modulo) return 1;
			return 0;
		})
	);

	const navigateToGroup = (slug) => {
		goto(`${base}/gruppi/${slug}`);
	};

	let currentIndex = $state(-1);
	$effect(() => {
		currentIndex = data?.gruppo?.gruppi?.findIndex(
			(g) => g.slug.current === data?.gruppo?.slug?.current
		);
	});

	const prevIndex = $derived(
		currentIndex > 0 ? currentIndex - 1 : data?.gruppo?.gruppi?.length - 1
	);

	const nextIndex = $derived(
		currentIndex < data?.gruppo?.gruppi?.length - 1 ? currentIndex + 1 : 0
	);
</script>

{#if data.gruppo}
	<div class="container-fluid mt-1">
		<div class="row">
			<div class="col-md-12 border-bottom border-white py-2">
				<h1 class="d-flex align-items-center gap-3">
					<a
						href="{base}/corsi/{data.gruppo.corso.slug.current}"
						class="text-decoration-none text-white"
					>
						<span class="fw-normal">{data.gruppo.corso.titolo}</span>
					</a>
					<span
						class="badge rounded-pill text-white border border-white fs-6 mt-2"
						style="background-color: {'#' + data.gruppo.corso.colore}"
						>{data.gruppo.corso.anno}</span
					>
				</h1>
			</div>
		</div>
	</div>
	<div class="container-fluid sticky-top bg-blur">
		<div class="row">
			<div class="col-md-12 border-bottom border-white pt-3 pb-2">
				<h1 class="fs-big fw-normal text-uppercase">{data.gruppo.nome}</h1>
			</div>
		</div>
	</div>
	<div class="container-fluid mt-4">
		<div class="row">
			<div class="col-md-12 py-2">
				<p class="fs-4">{data.gruppo.descrizione}</p>
			</div>
		</div>
		<div class="row mt-5 border-bottom border-white pb-2">
			<div class="col-md-12">
				<h6 class="text-uppercase">STUDENTI</h6>
				<ul class="list-unstyled">
					{#each data.gruppo.studenti as studente}
						<li class="fs-5 text-uppercase">{studente.nome} {studente.cognome}</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>

	{#each sortedProjects as project}
		{#if project.modulo === 'data'}
			<DataProject {project} corsoColor={data.gruppo.corso.colore} />
		{:else if project.modulo === 'experience'}
			<ExperienceProject {project} />
		{/if}
	{/each}

	<div class="container-fluid mt-4 mb-4">
		<div class="row justify-content-between">
			{#if data.gruppo.prev}
				<div class="col-auto d-flex align-items-center">
					<button
						class="btn rounded-pill d-flex align-items-center justify-content-center hover-effect"
						style="--corso-color: #{data.gruppo.corso.colore}; width: 40px; height: 40px;"
						onclick={() => navigateToGroup(data.gruppo.prev.slug.current)}
					>
						<i class="bi bi-arrow-left text-white"></i>
					</button>
					<span class="ms-3 fs-5 text-uppercase">Precedente</span>
				</div>
			{/if}
			<div class="col-auto d-flex align-items-center ms-auto">
				{#if data.gruppo.next}
					<span class="me-3 fs-5 text-uppercase">Successivo</span>

					<button
						class="btn rounded-pill d-flex align-items-center justify-content-center hover-effect"
						style="--corso-color: #{data.gruppo.corso.colore}; width: 40px; height: 40px;"
						onclick={() => navigateToGroup(data.gruppo.next.slug.current)}
					>
						<i class="bi bi-arrow-right text-white"></i>
					</button>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.fs-big {
		font-size: 4rem;
	}
	.hover-effect {
		background-color: var(--corso-color);
	}
	.hover-effect:hover {
		background-color: white !important;
		color: var(--corso-color) !important;
	}
	.hover-effect:hover i {
		color: var(--corso-color) !important;
	}
</style>
