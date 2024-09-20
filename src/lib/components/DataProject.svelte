<script>
	import { getVideoUrl } from '$lib/sanityClient';
	import ProjectDetails from './ProjectDetails.svelte';
	import ImageGallery from './ImageGallery.svelte';
	import { urlFor } from '$lib/sanityClient';
	import { browser } from '$app/environment';
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

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
		showModal = true;
		isVideo = false;
		currentMediaIndex = index;
	}

	function closeModal() {
		showModal = false;
	}

	function nextMedia() {
		if (isVideo) return;
		if (currentMediaIndex < project.immagini.length - 1) {
			currentMediaIndex++;
		}
	}

	function prevMedia() {
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
		if (browser && showModal && !isVideo && modalContent && Hammer) {
			const hammer = new Hammer(modalContent);
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
	<div class="container-fluid border-bottom border-white pb-5">
		<ProjectDetails {project} />
		<div class="row">
			<div class="col-md-6 col-sm-12" style="min-height:600px;">
				<div class="d-flex flex-column align-items-start h-100">
					<p class="fs-5">
						{project.descrizione}
					</p>
					<button
						class="btn rounded-pill hover-effect text-white mt-5"
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
		<div class="modal modal-xl" style="display: block" onclick={handleOutsideClick}>
			<div
				class="modal-backdrop fade show"
				style="opacity: 0.5; background-color: #{corsoColor};"
			></div>
			<div class="modal-dialog modal-dialog-centered" style="z-index: 1050;">
				<div class="modal-content">
					<div class="modal-header d-flex justify-content-center align-items-center border-0">
						<button
							type="button"
							class="btn px-3 py-2 rounded-pill border-0 hover-effect bg-black text-white"
							style="--corso-color: #{corsoColor};"
							onclick={closeModal}
						>
							Chiudi
						</button>
					</div>
					<div
						class="modal-body d-flex align-items-center justify-content-center p-0 position-relative"
						bind:this={modalContent}
					>
						<!-- svelte-ignore legacy_code -->
						{#if isVideo && project.video}
							<!-- svelte-ignore a11y_media_has_caption -->
							<video
								autoplay
								controls
								style="max-width: 100%; max-height: calc(100vh - 200px); object-fit: contain;"
							>
								<source src={getVideoUrl(project.video)} type="video/mp4" />
								Your browser does not support the video tag.
							</video>
						{:else if project.immagini && project.immagini.length > 0}
							<div
								class="image-container"
								style="width: 100%; height: calc(100vh - 200px); position: relative; overflow: hidden;"
							>
								{#each project.immagini as image, index}
									{#if Math.abs(index - currentMediaIndex) <= 1}
										<div
											in:slide={{ duration: 300, easing: cubicInOut }}
											out:slide={{ duration: 300, easing: cubicInOut }}
											style="position: absolute; top: 0; left: {(index - currentMediaIndex) *
												100}%; width: 100%; height: 100%; transition: left 0.3s ease;"
										>
											<img
												src={urlFor(image).url()}
												alt={`Project image ${index + 1}`}
												style="width: 100%; height: 100%; object-fit: contain; object-position: top;"
											/>
										</div>
									{/if}
								{/each}
							</div>
							{#if !isVideo && project.immagini && project.immagini.length > 1}
								<button
									class="btn d-none d-md-flex align-items-center justify-content-center hover-effect bg-black text-white position-absolute"
									style="--corso-color: #{corsoColor}; width: 60px; height: 60px; border-radius: 50%; left: 10px; top: 50%; transform: translateY(-50%);"
									onclick={prevMedia}
									disabled={currentMediaIndex === 0}
								>
									<i class="bi bi-arrow-left"></i>
								</button>
								<button
									class="btn d-none d-md-flex align-items-center justify-content-center hover-effect bg-black text-white position-absolute"
									style="--corso-color: #{corsoColor}; width: 60px; height: 60px; border-radius: 50%; right: 10px; top: 50%; transform: translateY(-50%);"
									onclick={nextMedia}
									disabled={currentMediaIndex === project.immagini.length - 1}
								>
									<i class="bi bi-arrow-right"></i>
								</button>
							{/if}
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
	.modal-content {
		background-color: transparent;
		border: none;
	}
	.image-container {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
