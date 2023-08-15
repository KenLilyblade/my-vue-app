import { defineConfig, loadEnv } from 'vite' // 帮手函数，这样不用 jsdoc 注解也可以获取类型提示
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
// vite.config热重载
// import ViteRestart from 'vite-plugin-restart';
// 方法按需引入
import AutoImport from 'unplugin-auto-import/vite'
// 组件自动按需引入
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
// gzip压缩
import viteCompression from 'vite-plugin-compression'
import path from 'path'
//原子化css
import WindiCSS from 'vite-plugin-windicss'
//图片压缩
import viteImagemin from 'vite-plugin-imagemin'
//模板name属性
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
//自动引入图片
import ViteImages from 'vite-plugin-vue-images'

export default ({ mode }) =>
	defineConfig({
		plugins: [
			vue({
				reactivityTransform: true
			}),
			viteMockServe({
				mockPath: 'mock'
			}),
			WindiCSS(),
			viteCompression({
				verbose: true, // 是否输出压缩结果
				deleteOriginFile: false, // 删除源文件
				algorithm: 'gzip',
				ext: '.gz'
			}),
			// ViteRestart({
			//   restart: ['vite.config.[jt]s']
			// }),
			AutoImport({
				imports: ['vue', 'vue-router'], // 要自动引进哪些后缀名的文件方法
				dts: 'src/auto-imports.d.ts', //选择auto-imports.d.ts文件的路径
				resolvers: [
					ElementPlusResolver(),
					IconsResolver({
						prefix: 'Icon'
					})
				],
				// eslint报错解决
				eslintrc: {
					enabled: true, // Default `false`
					filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
					globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
				}
			}),
			Components({
				dirs: ['src/components'], // 要自动导入的文件夹
				extensions: ['vue'], // 文件类型
				exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/],
				dts: 'src/components.d.ts', //选择auto-imports.d.ts文件的路径
				// include: [/\.vue$/, /\.vue\?vue/],
				resolvers: [
					ElementPlusResolver({
						importStyle: 'sass'
					}),
					IconsResolver({
						enabledCollections: ['ep'] //按需icon前缀
					})
				] // ui库解析
			}),
			Icons({
				compiler: 'vue3',
				autoInstall: true
			}),
			viteImagemin({
				gifsicle: {
					optimizationLevel: 3,
					interlaced: true //隔行扫描gif进行渐进式渲染
				},
				optipng: {
					optimizationLevel: 5
				},
				mozjpeg: {
					quality: 50
				},
				pngquant: {
					quality: [0.8, 0.9],
					speed: 4
				},
				svgo: {
					plugins: [
						{
							name: 'removeViewBox'
						},
						{
							name: 'removeEmptyAttrs',
							active: false
						}
					]
				}
			}),
			//使vue3模板支持name属性
			vueSetupExtend(),
			//自动引入图片
			ViteImages({
				// Relative paths of image search directories
				dirs: ['src/assets/img'],
				// valid image extensions
				extensions: ['jpg', 'jpeg', 'png', 'svg', 'webp'],
				// Override default behavior of name -> image path resolution
				customResolvers: [],
				// Override Regex that searches for variables to replace. MUST include group
				customSearchRegex: '([a-zA-Z0-9]+)'
			})
		],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
				components: path.resolve(__dirname, 'src/components'),
				views: path.resolve(__dirname, 'src/views'),
				utils: path.resolve(__dirname, 'src/utils'),
				api: path.resolve(__dirname, 'src/api'),
				images: path.resolve(__dirname, 'public/images')
			}
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "./src/styles/element-reset.scss" as *;`
				}
			}
		},
		base: './', // 打包后空白
		publicDir: 'public', //静态资源服务的文件夹
		// 本地运行配置
		server: {
			host: '0.0.0.0',
			// https: true, //使用https,当 server.proxy 选项 也被使用时，将会仅使用 TLS。
			open: true, //服务启动时自动在浏览器中打开应用
			cors: true, //允许跨域
			port: 8080,
			proxy: {
				// 开发跨域代理
				// '/api': {
				// 	target: loadEnv(mode, process.cwd()).VITE_APP_WEB_URL, // 代理到哪个接口地址
				// 	changeOrigin: true // 允许跨域
				// 	rewrite: path => path.replace(/^\/api/, ''), //
				// 	secure: true // 支持https
				// },
				'/ym': {
					target: loadEnv(mode, process.cwd()).VITE_APP_WEB_URL, // 代理到哪个接口地址
					changeOrigin: true, // 允许跨域
					rewrite: path => path.replace(/^\/ym/, '') //
				},
				'/movies': {
					target: loadEnv(mode, process.cwd()).VITE_APP_WEB_URL, // 代理到哪个接口地址
					changeOrigin: true, // 允许跨域
					rewrite: path => path.replace(/^\/movies/, '') //
				}
			}
		},
		// 构建选项
		build: {
			target: 'modules', // 浏览器兼容性  "esnext"|"modules"
			outDir: 'dist', // 指定输出路径
			assetsDir: 'assets', // 生成静态资源的存放路径
			assetsInlineLimit: 4096, // 小于此阈值4096kb的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
			cssCodeSplit: true, // 启用/禁用 CSS 代码拆分
			sourcemap: false, // 构建后是否生成 source map 文件
			minify: 'esbuild', // 最小化混淆
			rollupOptions: {
				// 拆分打包
				output: {
					manualChunks: {
						vue: ['vue', 'vue-router']
					},
					chunkFileNames: 'assets/js/[name]-[hash].js',
					entryFileNames: 'assets/js/[name]-[hash].js',
					assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
				}
			},
			terserOptions: {
				compress: {
					keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
					drop_console: true, // 去掉console.log
					drop_debugger: true, // 去掉debug
					pure_funcs: ['console.log']
				}
				// output: {
				//   comments: true // 去掉注释内容
				// }
			}
		}
	})
