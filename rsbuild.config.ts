import * as path from 'path';

import { defineConfig } from '@rsbuild/core';
import { pluginLess } from '@rsbuild/plugin-less';
import { pluginReact } from '@rsbuild/plugin-react';
const rootDirname = path.resolve(__dirname, '../../');
const { PUBLIC_GOOGLE_CLIENT_ID } = import.meta.env;

export default defineConfig({
	plugins: [pluginReact(), pluginLess()],
	resolve: {
		alias: {
			'@app/css': path.resolve(rootDirname, './libs/assets/styles'),
			'@': path.resolve(__dirname, './src')
		}
	},
	html: {
		template: './static/index.html'
	},
	server: {
		publicDir: {
			name: './static'
		},
		proxy: {
			'/api/v1': {
				target: 'http://localhost:3030',
				changeOrigin: true
			}
		}
	},
	source: {
		define: {
			PUBLIC_GOOGLE_CLIENT_ID: `'${PUBLIC_GOOGLE_CLIENT_ID}'`
		}
	}
});
