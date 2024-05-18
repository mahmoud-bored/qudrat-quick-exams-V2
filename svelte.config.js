import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config} */

export default {
	preprocess: [vitePreprocess()],
	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: './build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			styled: true,
			utils: true,
			strict: true
		}),
	},
	onwarn: (warning, handler) => {
        if (warning.code === 'css-unused-selector') {
            return;
        }
        handler(warning);
    },
};

