import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: '404.html',
			pages: 'build',
			assets: 'build',
			precompress: false,
			strict: true,
			prerender: {
				default: true,
				handleHttpError: 'warn'
			},
			crawl: true
		}),
		paths: {
			base: process.argv.includes('dev') ? '' : process.env.PUBLIC_BASE_PATH
		}
	}
};

export default config;