<script>
	const { project } = $props();
</script>

<div class="row mt-3" style="margin-bottom: 100px;">
	<div class="col-md-6 col-sm-12">
		<h5 class="text-uppercase">{project.titolo}</h5>
	</div>
	<div class="col-md-6 col-sm-12 d-flex flex-row justify-content-between">
		<div class="d-flex flex-column flex-md-row justify-content-between w-100">
			<div>
				{#if project.studenti && project.studenti.length > 1}
					<p class="fs-5">Progetto collettivo</p>
				{:else if project.studenti}
					{#each project.studenti as student}
						<p class="fs-5">{student.nome} {student.cognome}</p>
					{/each}
				{/if}
			</div>
			<p class="fs-5 text-secondary">{project.tipologia}</p>
		</div>
	</div>
</div>

<style></style>
