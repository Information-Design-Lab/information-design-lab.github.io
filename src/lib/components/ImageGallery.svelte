<script>
	import { urlFor } from '$lib/sanityClient.js';
	import { slide } from 'svelte/transition';

	const { images, onImageClick, color } = $props();
	let currentIndex = $state(0);

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
</script>

<div class="image-gallery position-relative">
	{#if images && images.length > 0}
		<div class="image-container" style="transform: translateX(-{currentIndex * 65}%)">
			{#each images as image, index}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="image-wrapper" onclick={() => handleImageClick(index)}>
					<img src={urlFor(image).url()} alt={`project image ${index + 1}`} class="gallery-image" />
				</div>
			{/each}
		</div>

		{#if currentIndex > 0}
			<button
				class="btn me-2 ms-2 d-flex align-items-center justify-content-center position-absolute top-50 start-0 translate-middle-y gallery-button"
				style="--hover-color: #{color};"
				onclick={prevImage}
			>
				<i class="bi bi-arrow-left"></i>
			</button>
		{/if}

		{#if currentIndex < images.length - 1}
			<button
				class="btn ms-2 me-2 d-flex align-items-center justify-content-center position-absolute top-50 end-0 translate-middle-y gallery-button"
				style="--hover-color: #{color};"
				onclick={nextImage}
			>
				<i class="bi bi-arrow-right"></i>
			</button>
		{/if}
	{/if}
</div>

<style>
	.image-gallery {
		height: 550px;
		overflow: hidden;
		position: relative;
	}

	.image-container {
		display: flex;
		height: 100%;
		transition: transform 0.3s ease;
	}

	.image-wrapper {
		flex: 0 0 65%;
		height: 100%;
		padding: 0 5px;
	}

	.gallery-image {
		width: 100%;
		height: 100%;
		object-fit: contain;
		cursor: pointer;
	}

	.gallery-button {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: black;
		color: white;
		transition:
			background-color 0.3s,
			color 0.3s;
	}

	.gallery-button:hover {
		background-color: white;
		color: var(--hover-color);
	}

	@media (max-width: 768px) {
		.image-gallery {
			height: 350px;
		}
	}
</style>
