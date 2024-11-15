<script>
	import { base } from '$app/paths';
	import DataProject from '$lib/components/DataProject.svelte';
	import ExperienceProject from '$lib/components/ExperienceProject.svelte';
	import BlurredIconButton from '$lib/components/BlurredIconButton.svelte';
	import { goto } from '$app/navigation';
	import { PortableText } from '@portabletext/svelte';
	const { data } = $props();
	$inspect(data);

	const sortedProjects = $derived(
		data.gruppo.progetti.sort((a, b) => {
			if (a.modulo < b.modulo) return -1;
			if (a.modulo > b.modulo) return 1;
			return 0;
		})
	);

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

	function goToPrevGroup() {
		if (data.gruppo.prev) {
			goto(`${base}/gruppi/${data.gruppo.prev.slug.current}`);
		}
	}

	function goToNextGroup() {
		if (data.gruppo.next) {
			goto(`${base}/gruppi/${data.gruppo.next.slug.current}`);
		}
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

{#if data.gruppo}
	<div class="container-fluid mt-1">
		<div class="row">
			<div class="col-md-12 border-2 border-bottom border-white py-1">
				<h1 class="d-flex align-items-start gap-3">
					<a
						href="{base}/corsi/{data.gruppo.corso.slug.current}"
						class="text-decoration-none text-white"
					>
						<span class="fw-normal text-uppercase">{data.gruppo.corso.titolo}</span>
					</a>
					<span
						class="fw-semibold badge rounded-pill text-white fs-5 fw-semibold mt-2 py-1 px-2"
						style="box-shadow: inset 0 0 4px 2px {'#' +
							data.gruppo.corso.colore}, 0 0 4px 2px {'#' + data.gruppo.corso.colore}; 
						border: 1px solid {'#' + data.gruppo.corso.colore}; background-color: {'#' +
							data.gruppo.corso.colore}">{data.gruppo.corso.anno}</span
					>
				</h1>
			</div>
		</div>
	</div>
	<div class="container-fluid sticky-top bg-blur" style="background-color: rgba(0, 0, 0, 0.2);">
		<div class="row">
			<div class="col-md-12 border-2 border-bottom border-white py-1">
				<h1 class="mb-0 fs-big fw-normal text-uppercase">{data.gruppo.nome}</h1>
			</div>
		</div>
	</div>
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12 py-3">
				<p class="fs-4 fw-semibold">
					<PortableText value={data.gruppo.descrizione} />
				</p>
			</div>
		</div>
		<div class="row mt-5 border-bottom border-white pb-2">
			<div class="col-md-12">
				<h6 style="font-weight: 500;" class="text-uppercase">STUDENTI</h6>
				<ul class="list-unstyled">
					{#each data.gruppo.studenti as studente}
						<li style="font-size: 1.12rem; font-weight: 500;">
							{studente.nome}
							{studente.cognome}
						</li>
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
		<div class="row my-4">
			<div class="col-12 d-flex justify-content-end align-items-center">
				<span class="fs-5 me-3">Torna su</span>
				<BlurredIconButton
					icon="bi bi-arrow-up"
					color={data.gruppo.corso.colore}
					onClick={scrollToTop}
					--btn-color={'#' + data.gruppo.corso.colore}
				/>
			</div>
		</div>
		<div class="row justify-content-between mb-5">
			<div class="col-12 d-flex justify-content-between align-items-center">
				<div class="d-flex align-items-center">
					{#if data.gruppo.prev}
						<BlurredIconButton
							icon="bi bi-arrow-left"
							color={data.gruppo.corso.colore}
							onClick={goToPrevGroup}
							--btn-color={'#' + data.gruppo.corso.colore}
						/>
						<span class="fs-5 ms-3">Progetto precedente</span>
					{/if}
				</div>
				<div class="d-flex align-items-center">
					{#if data.gruppo.next}
						<span class="me-3 fs-5">Progetto successivo</span>
						<BlurredIconButton
							icon="bi bi-arrow-right"
							color={data.gruppo.corso.colore}
							onClick={goToNextGroup}
							--btn-color={'#' + data.gruppo.corso.colore}
						/>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.fs-big {
		font-size: 4rem;
	}
	/*:global(.btn-blur) {
		--btn-color: #{data.gruppo.corso.colore};
	}*/
	@media (max-width: 768px) {
		.fs-big {
			font-size: 3rem;
		}
	}
</style>
