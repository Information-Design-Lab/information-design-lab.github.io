<script>
	const { icon, disabled, onClick, classes } = $props();
</script>

<button
	class="{classes ||
		''} btn btn-blur rounded-circle d-flex justify-content-center align-items-center"
	style="width: 35px; height: 35px; font-weight: 500;"
	{disabled}
	onclick={onClick}
>
	<i class={icon}></i>
</button>

<style>
	.btn-blur {
		background-color: black;
		color: white;
		box-shadow:
			inset 0px 0px 4px 2px var(--btn-color),
			0px 0px 4px 2px var(--btn-color);
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
