<script>
	import { urlFor } from '$lib/sanityClient.js';
	import { browser } from '$app/environment';
	import BlurredIconButton from './BlurredIconButton.svelte';
	let isMobile = $state(false);

	$effect(() => {
		if (browser) {
			const checkMobile = () => {
				isMobile = window.innerWidth <= 768;
			};
			checkMobile();
			window.addEventListener('resize', checkMobile);
			return () => window.removeEventListener('resize', checkMobile);
		}
	});

	const { images, onImageClick, color } = $props();
	let currentIndex = $state(0);
	let startX;
	let imageGallery;

	const nextImage = () => {
		if (currentIndex < images.length - 1) {
			currentIndex++;
		}
	};

	const prevImage = () => {
		if (currentIndex > 0) {
			currentIndex--;
		}
	};

	const handleImageClick = (index) => {
		if (onImageClick) {
			onImageClick(index);
		}
	};

	const handleTouchStart = (e) => {
		startX = e.touches[0].clientX;
	};

	const handleTouchMove = (e) => {
		if (!startX) return;

		const currentX = e.touches[0].clientX;
		const diff = startX - currentX;

		if (Math.abs(diff) > 50) {
			// Threshold for swipe
			if (diff > 0) {
				nextImage();
			} else {
				prevImage();
			}
			startX = null;
		}
	};

	const handleTouchEnd = () => {
		startX = null;
	};

	$effect(() => {
		if (imageGallery) {
			imageGallery.addEventListener('touchstart', handleTouchStart, { passive: true });
			imageGallery.addEventListener('touchmove', handleTouchMove, { passive: true });
			imageGallery.addEventListener('touchend', handleTouchEnd, { passive: true });

			return () => {
				imageGallery.removeEventListener('touchstart', handleTouchStart);
				imageGallery.removeEventListener('touchmove', handleTouchMove);
				imageGallery.removeEventListener('touchend', handleTouchEnd);
			};
		}
	});
</script>

<div class="image-gallery position-relative" bind:this={imageGallery}>
	{#if images && images.length > 0}
		<div
			class="image-container"
			style="transform: translateX(-{currentIndex * (isMobile ? 100 : 65)}%)"
		>
			{#each images as image, index}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="image-wrapper"
					style="width: {isMobile ? '100%' : '65%'};"
					onclick={() => handleImageClick(index)}
					onkeypress={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							handleImageClick(index);
						}
					}}
				>
					<img src={urlFor(image).url()} alt={`project image ${index + 1}`} class="gallery-image" />
				</div>
			{/each}
		</div>
		<BlurredIconButton
			icon="bi bi-arrow-left"
			{color}
			onClick={prevImage}
			disabled={currentIndex === 0}
			--btn-color={'#' + color}
			classes="position-absolute top-50 start-0 translate-middle-y ms-2"
		/>
		<BlurredIconButton
			icon="bi bi-arrow-right"
			{color}
			onClick={nextImage}
			disabled={currentIndex === images.length - 1}
			--btn-color={'#' + color}
			classes="position-absolute top-50 end-0 translate-middle-y me-2"
		/>
	{/if}
</div>

<style>
	.image-gallery {
		height: auto;
		overflow: hidden;
		position: relative;
		touch-action: pan-y;
	}

	.image-container {
		display: flex;
		height: 100%;
		transition: transform 0.3s ease;
	}

	.image-wrapper {
		flex: 0 0 auto;
		height: 100%;
		padding: 0 5px;
	}

	.gallery-image {
		width: 100%;
		height: 100%;
		object-fit: contain;
		cursor: pointer;
		object-position: top;
	}

	.gallery-button {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: black;
		color: white;
		transition:
			background-color 0.1s,
			color 0.1s;
	}

	.gallery-button:hover {
		background-color: white;
		color: var(--hover-color);
		border: none;
	}

	.gallery-button:disabled {
		border: none !important;
		outline: none !important;
	}

	@media (max-width: 768px) {
		.image-gallery {
			height: 350px;
		}
	}
</style>
