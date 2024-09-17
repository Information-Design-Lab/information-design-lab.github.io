<script>
	import { browser } from '$app/environment';

	let lastScrollTop = 0;
	let headerElement;

	$effect(() => {
		if (browser) {
			const handleScroll = () => {
				const st = window.pageYOffset || document.documentElement.scrollTop;
				if (st > lastScrollTop) {
					// Scrolling down
					headerElement.style.transform = 'translateY(-100%)';
				} else {
					// Scrolling up
					headerElement.style.transform = 'translateY(0)';
				}
				lastScrollTop = st <= 0 ? 0 : st;
			};

			window.addEventListener('scroll', handleScroll);
			return () => {
				window.removeEventListener('scroll', handleScroll);
			};
		}
	});
</script>

<div
	bind:this={headerElement}
	class="container-fluid bg-black header sticky-top border-0 border-bottom"
>
	<div class="row d-flex justify-content-between align-items-center h-100">
		<div class="col-auto">
			<h4 class="mb-0 text-uppercase">
				<a class="text-white text-decoration-none" href="/">Information design lab</a>
			</h4>
		</div>
		<div class="col-auto d-none d-md-block">
			<img class="logo" src="/logo_srm.png" alt="Information design lab" />
		</div>
	</div>
</div>

<style>
	.header {
		height: 64px;
		transition: transform 0.3s ease-in-out;
	}
	.logo {
		height: 24px;
		width: auto;
	}
</style>
