import { defineConfig } from 'windicss/helpers'
import plugin from 'windicss/plugin'
import colors from 'windicss/colors'
import windiClass from './src/assets/styles/windiClass'

export default defineConfig({
	darkMode: 'class',
	preflight: false,
	extend: {},
	extract: {
		include: ['src/**/*.{vue,html,jsx,tsx}'],
		exclude: ['node_modules', '.git'],
	},
	plugins: [
		plugin(({ addUtilities }) => {
			addUtilities(windiClass)
		}),
		// require('windicss/plugin/filters'),
		// require('windicss/plugin/forms'),
		// require('windicss/plugin/aspect-ratio'),
		require('windicss/plugin/line-clamp'),
	],
	theme: {
		colors: {
			333: '#333',
			eee: '#eee',
			666: '#666',
			999: '#999',
			888: '#888',
			f8f8f8: '#f8f8f8',
			fff: '#fff',
			ccc: '#fff',
			...colors,
		},
	},
})
