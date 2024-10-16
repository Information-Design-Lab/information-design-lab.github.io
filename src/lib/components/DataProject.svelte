<script>
	import { getVideoUrl } from '$lib/sanityClient';
	import ImageGallery from './ImageGallery.svelte';
	import { urlFor } from '$lib/sanityClient';
	import { browser } from '$app/environment';
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import BlurredButton from '$lib/components/BlurredButton.svelte';
	import BlurredIconButton from './BlurredIconButton.svelte';

	const { project, corsoColor } = $props();
	let showModal = $state(false);
	let currentMediaIndex = $state(0);
	let isVideo = $state(false);
	let modalContent = $state(null);
	let Hammer;

	$inspect(project);

	function handleViewProject() {
		if (project.video) {
			showModal = true;
			isVideo = true;
			currentMediaIndex = 0;
			disableBodyScroll();
		} else if (project.link) {
			window.open(project.link, '_blank');
		}
	}

	function handleImageClick(index) {
		showModal = true;
		isVideo = false;
		currentMediaIndex = index;
		disableBodyScroll();
	}

	function closeModal() {
		showModal = false;
		enableBodyScroll();
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

	function disableBodyScroll() {
		if (browser) {
			document.body.style.overflow = 'hidden';
		}
	}

	function enableBodyScroll() {
		if (browser) {
			document.body.style.overflow = '';
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

	$effect(() => {
		return () => {
			if (showModal) {
				enableBodyScroll();
			}
		};
	});
</script>

{#if project}
	<div class="container-fluid pb-5">
		<div class="row">
			<div class="col-md-12 col-sm-12">
				<div class="d-none d-md-flex flex-wrap mt-2">
					{#each project?.immagini as image, index}
						<div class="col-md-3 p-2">
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
							<img
								src={urlFor(image).url()}
								alt={`Project image ${index + 1}`}
								class="img-fluid cursor-pointer"
								onclick={() => handleImageClick(index)}
							/>
						</div>
					{/each}
				</div>
				<div class="d-md-none mt-2">
					<ImageGallery
						color={corsoColor}
						images={project.immagini}
						onImageClick={handleImageClick}
					/>
				</div>
			</div>
		</div>
	</div>
	<div class="container-fluid border-bottom border-white pb-5">
		<!-- 
		<ProjectDetails {project} />
		 -->
		<div class="row">
			<div class="col-md-3 offset-md-3 col-sm-12">
				<div>
					<h6 style="font-weight: 500;" class="text-uppercase mb-1">{project.titolo}</h6>
					{#if project.studenti && project.studenti.length > 1}
						<p style="margin-bottom: 10px;" class="fs-6">Progetto collettivo</p>
					{:else if project.studenti}
						{#each project.studenti as student}
							<p style="margin-bottom: 10px;" class="fs-6">{student.nome} {student.cognome}</p>
						{/each}
					{/if}
				</div>
				<p class="fs-6 text-secondary mt-0">{project.tipologia}</p>
			</div>
			<div class="col-md-6 col-sm-12">
				<div class="d-flex flex-column align-items-start h-100">
					<p class="fs-6">
						{project.descrizione}
					</p>
					<BlurredButton
						text="Vedi il progetto"
						color={corsoColor}
						onClick={handleViewProject}
						--btn-color={'#' + corsoColor}
						classes="my-5"
					/>
				</div>
			</div>
		</div>
	</div>

	{#if showModal}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="modal modal-xl" style="display: block" onclick={handleOutsideClick}>
			<div
				class="modal-backdrop fade show"
				style="opacity:1 !important; background-color: rgba(0,0,0,0.7); backdrop-filter: blur(10px);"
			></div>
			<div class="modal-dialog modal-dialog-centered" style="z-index: 1050;">
				<div class="modal-content">
					<div
						class="modal-header px-1 d-flex {isVideo
							? 'justify-content-end'
							: 'justify-content-between'} align-items-center border-0"
						style={!isVideo ? 'width:calc(100vh - 200px); align-self:center; max-width: 100%' : ''}
					>
						{#if !isVideo && project?.immagini && project?.immagini?.length > 0}
							<div class="align-self-start d-flex flex-row gap-3">
								<BlurredIconButton
									icon="bi bi-arrow-left"
									color={corsoColor}
									onClick={prevMedia}
									disabled={currentMediaIndex === 0}
									--btn-color={'#' + corsoColor}
								/>
								<BlurredIconButton
									icon="bi bi-arrow-right"
									color={corsoColor}
									onClick={nextMedia}
									disabled={currentMediaIndex === project.immagini.length - 1}
									--btn-color={'#' + corsoColor}
								/>
							</div>
						{/if}
						<BlurredButton
							text="Chiudi"
							color={corsoColor}
							onClick={closeModal}
							--btn-color={'#' + corsoColor}
						/>
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
						{:else if project?.immagini && project?.immagini?.length > 0}
							<div
								class="image-container"
								style="width: 100%; height: calc(100vh - 200px); position: relative; overflow: hidden;"
							>
								{#each project?.immagini as image, index}
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
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/if}
{/if}

<style>
	.modal-content {
		background-color: transparent;
		border: none;
	}
	.image-container {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.cursor-pointer {
		cursor: pointer;
	}
</style>
