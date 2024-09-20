<script>
	import { base } from '$app/paths';
	const { data } = $props();
</script>

{#if data.corso}
	<div class="container-fluid mt-1 sticky-top bg-blur">
		<div class="row">
			<div class="col-md-12 border-2 border-bottom border-white py-1">
				<h1 class="d-flex align-items-center gap-3">
					<span class="fw-normal text-uppercase">{data.corso.titolo}</span>
					<span
						class="badge fw-semibold rounded-pill text-white border border-white fs-6 mt-0"
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
							class="border-white px-3 py-1 group-item"
							class:border-top={index !== 0}
							class:border-bottom={index !== data.corso.gruppi.length - 1}
							style="--corso-color: #{data.corso.colore};"
						>
							<a href="{base}/gruppi/{gruppo.slug.current}" class="text-decoration-none text-white">
								<p class="fw-normal text-uppercase fw-big my-0">{gruppo.nome}</p>
							</a>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
{/if}

<style>
	.group-item:hover {
		background-color: var(--corso-color);
	}
	.fw-big {
		font-size: 4rem;
	}
</style>
