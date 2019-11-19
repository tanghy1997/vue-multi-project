// vue.config.js
'use strict';
const path = require('path');
const resolve = dir => path.join(__dirname, dir);
const fs = require('fs');
// glob是webpack安装时依赖的一个第三方模块，还模块允许你使用 *等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件
const glob = require('glob');
//压缩代码并去掉console
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// 它会将所有的入口 chunk(entry chunks)中引用的 *.css，移动到独立分离的 CSS 文件
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const utils = require('./config-util');

let {pages} = utils.getPages();

module.exports = {
    lintOnSave: false, //禁用eslint
    publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
    outputDir: './dist', //也可加标识，动态打包到相关文件夹
    //打包文件是否使用hash
    filenameHashing: true,
    pages: pages,
    //静态资源打包路径
    assetsDir: "static",
    productionSourceMap: false,
    css: {
        // 将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块
        requireModuleExtension: false,
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},

    },
    devServer: {
        index: 'entry/playGuide.html', //默认启动serve 打开playGuide页面
        open: true, // 项目构建成功之后，自动弹出页面
        host: 'localhost', // 主机名，也可以127.0.0.0 || 做真机测试时候0.0.0.0
        port: 8088, // 端口号，默认8080
        https: false,
        hotOnly: false,
        // proxy: {
		// 	'/xrf/': {
		// 		target: 'http://reg.tool.hexun.com/',
		// 		changeOrigin: true,
		// 		pathRewrite: {
		// 			'^/xrf': ''
		// 		}
		// 	},
		// 	'/wa/': {
		// 		target: 'http://api.match.hexun.com/',
		// 		changeOrigin: true,
		// 		pathRewrite: {
		// 			'^/wa': ''
		// 		}
		// 	}
		// }, // 设置代理
		before: app => {}
    },
    chainWebpack: config => {
        //添加别名
        config.resolve.alias
        .set("@", resolve("src"))
        .set("static", resolve("src/static"));

		config.module
			.rule('images')
			.use('url-loader')
			.loader('url-loader')
			.tap(options => {
				// 修改它的选项...
				options.limit = 100
				return options
			})
		Object.keys(pages).forEach(entryName => {
			config.plugins.delete(`prefetch-${entryName}`);
		});
		if(process.env.NODE_ENV === "production") {
			config.plugin("extract-css").tap(() => [{
				path: path.join(__dirname, "./dist"),
				filename: "css/[name].[contenthash:8].css"
			}]);
		}
	},
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            //启用代码压缩
            plugins: [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            warnings: false,
                            drop_console: true,
                            drop_debugger: false,
                            pure_funcs: ["console.log"] //移除console
                        }
                    },
                    sourceMap: false,
                    parallel: true
                }),
                new ExtractTextPlugin({
                    filename: utils.assetsPath('css/[name].[contenthash].css'),
                    allChunks: true
                })
            ];
        } else if(process.env.NODE_ENV === 'staging') {
            console.log('这次走的是测试')
            // 为测试环境修改配置...
            //启用代码压缩
            plugins: [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            warnings: false,
                            drop_console: true,
                            drop_debugger: false,
                            pure_funcs: ["console.log"] //移除console
                        }
                    },
                    sourceMap: false,
                    parallel: true
                }),
                new ExtractTextPlugin({
                    filename: utils.assetsPath('css/[name].[contenthash].css'),
                    allChunks: true
                })
            ];
        }else{
          // 开发环境配置
        }
    }
}