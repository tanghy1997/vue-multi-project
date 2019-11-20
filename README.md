# common-h5-webpack4
> 项目是基于Vue-cli3和webpack4搭建的多入口项目，通过在entry-page中配置来动态打包,项目中css默认node-sass

## 配置
多页应用需要在entry-page中按照demo配置对应的入口文件

## 安装依赖项
```
yarn install
```

### 本地开发环境development
```
yarn run serve
```

### 测试环境打包
```
npm run build:stage
```

### 生产环境打包
```
npm run build:prod
```

### devserver
- 默认打开
```
http://localhost:8088/#/
# 默认打开这个页面playGuide在vue.config.js中可配
```
打开其他页面
```
# demo
http://localhost:8088/testDemo.html/#/
```

### 目录
- config 是一些通用的系统配置方法工具之类
- dist 是打包产物
- entry-page 多页应用的入口文件配置
- src 对应业务代码