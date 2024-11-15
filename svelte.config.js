import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		prerender: {
			handleHttpError: 'warn'
		},
		adapter: adapter({
			fallback: '404.html',
			pages: 'build',
			assets: 'build',
			precompress: false,
			strict: true,
			prerender: {
				default: true
			},
			crawl: true
		}),
		paths: {
			base: process.argv.includes('dev') ? '' : process.env.PUBLIC_BASE_PATH
		}
	}
};

export default config;