import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy';
import styles from 'rollup-plugin-styler';

export default [
	{
		input: './src/js/application.js',
		output: {
			file: './dist/js/application.js',
			format: 'esm'
		},
		plugins: [
			styles({
				mode: [
					'inject',
					(varname) => `import { styleInject } from 'harmony-ui';styleInject(${varname});`
				],
			}),
			json({
				compact: true,
			}),
			nodeResolve(),
			copy({
				copyOnce: true,
				targets: [
					{src: 'src/index.html', dest: 'dist/'},
				]
			}),
		],
	},
];
