<script>
	import ProjectDetails from './ProjectDetails.svelte';
	import { urlFor, getVideoUrl } from '$lib/sanityClient';
	const { project } = $props();

	let videoElement = $state(null);
	let showPlayButton = $state(true);

	function playVideo() {
		if (videoElement) {
			videoElement.play();
			showPlayButton = false;
		}
	}

	function handleVideoEnded() {
		showPlayButton = true;
	}
</script>

{#if project}
	<!--<div class="container-fluid">
		<div class="row">
			<ProjectDetails {project} />
		</div>
	</div>-->
	<div class="container-fluid mt-3">
		<div class="row">
			<div class="col-md-12">
				{#if project?.immagini?.[3]}
					<img class="w-100" src={urlFor(project?.immagini?.[3]).url()} alt={project?.titolo} />
				{/if}
			</div>
		</div>
	</div>
	<div class="container-fluid my-5">
		<!-- 
		<ProjectDetails {project} />
		 -->
		<div class="row">
			<div class="col-md-3 offset-md-3 col-sm-12">
				<div>
					<h5 class="text-uppercase">{project.titolo}</h5>
					{#if project.studenti && project.studenti.length > 1}
						<p class="fs-5 mb-2">Progetto collettivo</p>
					{:else if project.studenti}
						{#each project.studenti as student}
							<p class="fs-5 mb-2">{student.nome} {student.cognome}</p>
						{/each}
					{/if}
				</div>
				<p class="fs-5 text-secondary mt-0">{project.tipologia}</p>
			</div>
			<div class="col-md-6 col-sm-12">
				<div class="d-flex flex-column align-items-start h-100">
					<p class="fs-5">
						{project.descrizione}
					</p>
				</div>
			</div>
		</div>
	</div>
	<div class="container-fluid">
		<div class="row gx-0" style="margin-top: 20px;">
			{#if project?.immagini?.[0]}
				<div class="exp-img col-md-4 col-xs-12">
					<img class="w-100" src={urlFor(project?.immagini?.[0]).url()} alt={project?.titolo} />
				</div>
			{/if}
			{#if project?.immagini?.[1]}
				<div class="exp-img col-md-4 col-xs-12">
					<img class="w-100" src={urlFor(project?.immagini?.[1]).url()} alt={project?.titolo} />
				</div>
			{/if}
			{#if project?.immagini?.[2]}
				<div class="exp-img col-md-4 col-xs-12">
					<img class="w-100" src={urlFor(project?.immagini?.[2]).url()} alt={project?.titolo} />
				</div>
			{/if}
		</div>
	</div>
	<div class="container-fluid mt-5 mb-5">
		<div class="row justify-content-center">
			<div class="col-md-7 col-xs-12">
				{#if project.video}
					<div class="ratio ratio-16x9 position-relative">
						<!-- svelte-ignore a11y_media_has_caption -->
						<video bind:this={videoElement} onended={handleVideoEnded} controls>
							<source src={getVideoUrl(project.video)} type="video/mp4" />
							Your browser does not support the video tag.
						</video>
						{#if showPlayButton}
							<div
								class="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
							>
								<button
									class="d-flex justify-content-center align-items-center bg-white rounded-circle border-0"
									style="width: 80px; height: 80px;"
									onclick={playVideo}
								>
									<i class="bi bi-play-fill text-black fs-1"></i>
								</button>
							</div>
						{/if}
					</div>
				{:else if project.immagini && project.immagini.length > 4}
					<img
						class="w-100"
						src={urlFor(project.immagini[4]).url()}
						alt={`${project.titolo} - Additional image`}
					/>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.exp-img {
		padding: 0 10px 0 10px;
	}
</style>
