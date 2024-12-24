import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			screens: {
				sm: { raw: '(min-width: 640px) and (min-height: 640px)' },
				md: { raw: '(min-width: 960px) and (min-height: 960px)' },
				lg: { raw: '(min-width: 1280px) and (min-height: 1280px)' },
				xl: { raw: '(min-width: 1600px) and (min-height: 1600px)' }
			}
		}
	},

	plugins: []
} satisfies Config;
