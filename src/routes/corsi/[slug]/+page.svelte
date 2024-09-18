<script>
	const { data } = $props();
</script>

{#if data.corso}
	<div class="container-fluid mt-1 sticky-top bg-blur">
		<div class="row">
			<div class="col-md-12 border-bottom border-white py-2">
				<h1 class="d-flex align-items-center gap-3">
					<span class="fw-normal">{data.corso.titolo}</span>
					<span
						class="badge rounded-pill text-white border border-white fs-6 mt-2"
						style="background-color: {'#' + data.corso.colore}">{data.corso.anno}</span
					>
				</h1>
			</div>
		</div>
	</div>
	<div class="container-fluid mt-4">
		<div class="row">
			<div class="col-md-7 col-sm-12">
				<p class="fs-4 fw-semibold">{data.corso.descrizione}</p>
			</div>
		</div>
	</div>
	{#if data.corso.gruppi && data.corso.gruppi.length > 0}
		<div class="container-fluid mt-4">
			<div class="row">
				<div class="col-12">
					{#each data.corso.gruppi as gruppo, index}
						<div
							class="border-white p-3"
							class:border-top={index !== 0}
							class:border-bottom={index !== data.corso.gruppi.length - 1}
						>
							<a href={`/gruppi/${gruppo.slug.current}`} class="text-decoration-none text-white">
								<h1 class="fw-normal text-uppercase">{gruppo.nome}</h1>
							</a>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
{/if}
