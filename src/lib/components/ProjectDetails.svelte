<script>
	const { project } = $props();
</script>

<div class="row">
	<div class="col-md-6 col-sm-12">
		<h5 class="text-uppercase">{project.titolo}</h5>
	</div>
	<div class="col-md-6 col-sm-12 d-flex flex-row justify-content-between">
		{#if project.studenti && project.studenti.length > 1}
			<p class="fs-5">Progetto collettivo</p>
		{:else if project.studenti}
			{#each project.studenti as student}
				<p class="fs-5">{student.nome} {student.cognome}</p>
			{/each}
		{/if}
		<p class="fs-5 text-secondary">{project.tipologia}</p>
	</div>
</div>
