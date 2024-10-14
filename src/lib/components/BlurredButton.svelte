<script>
	const { text, color, onClick, classes } = $props();
</script>

<button class="{classes || ''} btn btn-blur rounded-pill px-3 py-1" onclick={onClick}>{text}</button
>

<style>
	.btn-blur {
		background-color: transparent;
		color: white;
		box-shadow:
			inset 0px 0px 2px 2px var(--btn-color),
			0px 0px 2px 2px var(--btn-color);
		border: 1px solid var(--btn-color);
		transition: all 0.3s ease;
	}
	.btn-blur:hover {
		background-color: var(--btn-color);
	}
	.btn-blur:active,
	.btn-blur:focus {
		border: 1px solid var(--btn-color);
	}
</style>
