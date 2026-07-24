import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				powder_blush: {
					DEFAULT: '#ffa69e',
					100: '#ffedec',
					200: '#ffdbd8',
					300: '#ffcac5',
					400: '#ffb8b1',
					500: '#ffa69e',
					600: '#ff5a4b',
					700: '#f81500',
					800: '#a50e00',
					900: '#530700',
				},
				eggshell: {
					DEFAULT: '#faf3dd',
					100: '#fefdf8',
					200: '#fdfaf1',
					300: '#fcf8ea',
					400: '#fbf5e3',
					500: '#faf3dd',
					600: '#edd68a',
					700: '#e1ba38',
					800: '#a38318',
					900: '#52410c',
				},
				icy_aqua: {
					DEFAULT: '#b8f2e6',
					100: '#f1fcfa',
					200: '#e3faf5',
					300: '#d6f7f1',
					400: '#c8f5ec',
					500: '#b8f2e6',
					600: '#72e5ce',
					700: '#29d8b5',
					800: '#1b9179',
					900: '#0d483d',
				},
				light_blue: {
					DEFAULT: '#aed9e0',
					100: '#eff7f9',
					200: '#def0f3',
					300: '#cee8ec',
					400: '#bee1e6',
					500: '#aed9e0',
					600: '#74bfca',
					700: '#429fad',
					800: '#2c6a73',
					900: '#16353a',
				},
				blue_slate: {
					DEFAULT: '#5e6472',
					100: '#dee0e4',
					200: '#bdc0c9',
					300: '#9ca1ae',
					400: '#7b8293',
					500: '#5e6472',
					600: '#4b505c',
					700: '#383c45',
					800: '#26282e',
					900: '#131417',
				},
			},
		},
	},
	plugins: [],
};

export default config;
