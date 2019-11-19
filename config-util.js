//这是一个配置工具文件；
'use strict';
const path = require('path');
const fs = require('fs');
// glob是webpack安装时依赖的一个第三方模块，还模块允许你使用 *等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件
const glob = require('glob');
const merge = require("webpack-merge");


// 获取entry-page中所有的入口（约定）配置信息
exports.getPages = function() {
    let globPath = 'entry-page/**/*';
    let files = glob.sync(globPath); // 在vue-cli3中配置文件的路径不需要加相对路径，也不需要找绝对路径
    let entryName, entries = [];
    let pages = {};
    for(let i = 0;i < files.length;i++) {
        if(fs.lstatSync(files[i]).isDirectory()) {  //isDirectory如果 fs.Stats 对象描述文件系统目录
            entryName = path.basename(files[i]);
            console.log(`find entry: [${entryName}]`)
            entries.push({
                name: entryName
            })
        }
    }
    entries.forEach(entriesName => {
        let conf = {
            entry: `./entry-page/${entriesName.name}/${entriesName.name}.js`, // 此处需要注意，如果引用ts和html不同名称与路径的文件，在此处做相应改写
            template: `./entry-page/${entriesName.name}/${entriesName.name}.html`, // 此处是html文件的访问路径
            title:  `${entriesName.name} Page`,
            filename: `entry/${entriesName.name}.html`,
            chunks: ["chunk-vendors", "chunk-common", entriesName.name],
           };
        if(process.env.NODE_ENV === "production") {
            conf = merge(conf, {
            minify: {
             removeComments: true,
             collapseWhitespace: true,
             removeAttributeQuotes: true
            },
            chunksSortMode: "dependency"
            });
        }
        pages[entriesName.name] = conf;
    })
    // console.log('这是分页配置', {pages, entries})
    return {pages, entries};
}

exports.assetsPath = function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
      ? 'static'
      : 'static'
  
    return path.posix.join(assetsSubDirectory, _path)
}
  