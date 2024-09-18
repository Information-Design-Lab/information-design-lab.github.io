<script>
	import { getVideoUrl } from '$lib/sanityClient';
	import ProjectDetails from './ProjectDetails.svelte';
	import ImageGallery from './ImageGallery.svelte';
	import { urlFor } from '$lib/sanityClient';
	import { browser } from '$app/environment';
	const { project, corsoColor } = $props();
	let showModal = $state(false);
	let currentMediaIndex = $state(0);
	let isVideo = $state(false);
	let modalContent = $state(null);
	let Hammer;

	function handleViewProject() {
		if (project.video) {
			showModal = true;
			isVideo = true;
			currentMediaIndex = 0;
		} else if (project.link) {
			window.open(project.link, '_blank');
		}
	}

	function handleImageClick(index) {
		//console.log('handleImageClick');
		showModal = true;
		isVideo = false;
		currentMediaIndex = index;
	}

	function closeModal() {
		showModal = false;
	}

	function nextMedia() {
		//console.log('nextMedia');
		if (isVideo) return;
		if (currentMediaIndex < project.immagini.length - 1) {
			currentMediaIndex++;
		}
	}

	function prevMedia() {
		//console.log('prevMedia');
		if (isVideo) return;
		if (currentMediaIndex > 0) {
			currentMediaIndex--;
		}
	}

	function handleOutsideClick(event) {
		if (event.target.classList.contains('modal-backdrop')) {
			closeModal();
		}
	}

	$effect(async () => {
		if (browser) {
			Hammer = (await import('hammerjs')).default;
		}
	});

	$effect(() => {
		//console.log(browser, showModal, !isVideo, modalContent, Hammer, 'check');
		if (browser && showModal && !isVideo && modalContent && Hammer) {
			const hammer = new Hammer(modalContent);
			//console.log('Hammer initialized');
			hammer.on('swipeleft', nextMedia);
			hammer.on('swiperight', prevMedia);

			return () => {
				hammer.off('swipeleft');
				hammer.off('swiperight');
				hammer.destroy();
			};
		}
	});
</script>

{#if project}
	<div class="container-fluid border-bottom border-white mt-3 pb-5">
		<ProjectDetails {project} />
		<div class="row">
			<div class="col-md-6 col-sm-12" style="min-height:600px;">
				<div class="d-flex flex-column align-items-start justify-content-around h-100">
					<p class="fs-5">
						{project.descrizione}
					</p>
					<button
						class="btn rounded-pill hover-effect text-white"
						style="--corso-color: #{corsoColor}; background-color: #{corsoColor};"
						onclick={handleViewProject}>Vedi il progetto</button
					>
				</div>
			</div>
			<div class="col-md-6 col-sm-12">
				<ImageGallery
					color={corsoColor}
					images={project.immagini}
					onImageClick={handleImageClick}
				/>
			</div>
		</div>
	</div>

	{#if showModal}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="modal" style="display: block;" onclick={handleOutsideClick}>
			<div
				class="modal-backdrop fade show"
				style="opacity: 0.5; background-color: #{corsoColor};"
			></div>
			<div class="modal-dialog modal-lg" style="z-index: 1050;">
				<div class="modal-content bg-transparent border-0">
					<div
						class="modal-header bg-transparent d-flex justify-content-between align-items-center border-0"
					>
						<div class="d-flex">
							{#if !isVideo && project.immagini && project.immagini.length > 1}
								<button
									class="btn d-flex me-2 align-items-center justify-content-center hover-effect bg-black text-white"
									style="--corso-color: #{corsoColor}; width: 40px; height: 40px; border-radius: 50%;"
									onclick={prevMedia}
									class:opacity-0={currentMediaIndex === 0}
								>
									<i class="bi bi-arrow-left"></i>
								</button>
								<button
									class="btn d-flex align-items-center justify-content-center hover-effect bg-black text-white"
									style="--corso-color: #{corsoColor}; width: 40px; height: 40px; border-radius: 50%;"
									onclick={nextMedia}
									class:opacity-0={currentMediaIndex === project.immagini.length - 1}
								>
									<i class="bi bi-arrow-right"></i>
								</button>
							{/if}
						</div>
						<button
							type="button"
							class="btn px-3 py-2 rounded-pill border-0 hover-effect bg-black text-white"
							style="--corso-color: #{corsoColor};"
							onclick={closeModal}
						>
							Chiudi
						</button>
					</div>
					<div class="modal-body position-relative bg-black" bind:this={modalContent}>
						<!-- svelte-ignore legacy_code -->
						{#if isVideo && project.video}
							<!-- svelte-ignore a11y_media_has_caption -->
							<video autoplay controls width="100%">
								<source src={getVideoUrl(project.video)} type="video/mp4" />
								Your browser does not support the video tag.
							</video>
						{:else if project.immagini && project.immagini.length > 0}
							<div class="swipable-container" style="overflow: hidden;">
								<div
									class="swipable-content"
									style="display: flex; transition: transform 0.3s ease; transform: translateX(-{currentMediaIndex *
										100}%);"
								>
									{#each project.immagini as image, index}
										<img
											src={urlFor(image).url()}
											alt={`Project image ${index + 1}`}
											style="width: 100%; height: auto; flex-shrink: 0;"
										/>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/if}
{/if}

<style>
	.hover-effect {
		transition:
			background-color 0.1s,
			color 0s;
	}
	.hover-effect:hover {
		background-color: white !important;
		color: var(--corso-color) !important;
	}
</style>
