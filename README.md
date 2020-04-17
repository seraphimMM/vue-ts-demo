# vue-ts-demo

### 更多的配置项可以参考官方提供的示例
See [Configuration Reference](https://cli.vuejs.org/config/).

# 以下是本项目的构造和设计
1 本项目是基于vue.js 2.6 以及vue cli 3.9为基础开发的，使用本项目需要对 vue.js, typescript, less, lodash, element-ui 有基础。

由于项目需要npm，请确认环境已经安装 node.js 比较新的版本

2 开发环境请双击直接运行 [dev-start.bat] 文件即可，初次启动会下载部分依赖包，需要一些时间

3 如若要配置 webpack 参数，请移至 [vue.config.js] 文件中，不过此文件需要了解一些 [webpack chain]方面的知识，可以查阅

https://cnpmjs.org/package/webpack-chain

4 项目使用 [tslint] 来严格约束代码风格，不过 tslint 按官方计划会逐步被 eslint 替换，我本人更习惯于 tslint 所以还没有去切换

如果要修改 tslint rules 可以查阅

https://palantir.github.io/tslint/rules/

tslint 的本地规则修改请移至 [tslint.json] 进行相应配置

### 项目变更

此read me文件修改于2020/4/17

此demo 只是完成项目构架和组织结构搭建，时间有限，尚不能完成更多功能。

涉及到的点有如下一些方面：
1 全局样式库设计，主框架提供全局风格的统一，如字体，字号，布局模式（flex），自定义的ui样式库，自定义的资源库等

2 通信模块设计，环境启动时全局vue示例会挂载统一通信服务，
  service的定义和实现均放于 [services/service.ts] 文件中统一管理，
  任何外部组件除非特殊情况不允许直接使用Axios去与服务端通信

3 统一协调的自定义控制，其他需要自定义的全局指令或者directive等均在 [filters/filter.ts] 中完成，只有index文件统一暴露
  同理，所有自定义组件（全局作用域）会放到顶级components文件夹下，以index文件统一暴露
  局部组件可以放到所属模块子页面按需调用，不需要挂载到全局作用域下

4 demo 本身承载的业务功能，由于时间有限，我只完成的一个登陆和主面板的导航等基本功能
