<script>
	const page = $props();
	const corsi = $derived(page.data.corsi);
</script>

<div class="container-fluid mt-2">
	<div class="row justify-content-between">
		<div class="col-md-7 col-sm-12">
			<p class="fw-semibold fs-3">
				Il laboratorio di Information Design, sviluppato su due moduli integrati, ha l’obiettivo di
				introdurre gli studenti alla progettazione di artefatti comunicativi che hanno lo scopo di
				veicolare temi e informazioni complesse e offrire una visione ampia sul valore, sulle
				potenzialità e i limiti dei dati. Gli studenti, organizzati in gruppi di lavoro, partiranno
				dalla selezione di un tema di ricerca che svilupperanno tramite la selezione e l’analisi
				visuale di set di dati che ne rappresentano alcune dimensioni. Dopo una prima fase di
				analisi, gli studenti dovranno sviluppare un progetto composto da tre elementi: una
				pubblicazione digitale in grado di presentare il tema e i dati analizzati;
				un’installazione/campagna di comunicazione capace di riportare l’esperienza digitale in uno
				spazio fisico; un video che racconta l’intera esperienza in tutte le sue fasi significative.
			</p>
		</div>
		<div class="col-md-4 col-sm-12 mt-2">
			<div class="mb-4">
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
			</div>
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
					<a href={`corsi/${corso.slug.current}`} class="text-decoration-none text-white">
						<span class="fw-normal">{corso.titolo}</span>
					</a>
					<span
						class="badge rounded-pill text-white border border-white fs-6 mt-2"
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
</style>
