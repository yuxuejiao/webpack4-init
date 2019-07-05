## babel 7.x 配置
### 预设（presets）和插件（plugins）
* presets：创建预设，主要通过npm安装babel-preset-xx插件来配合使用。
```
    presets预设就是一些预先配置好的插件的集合，和手动去设定一些插件是一样的。
    官方推荐使用语法转义器@babel/preset-env来替代一些插件包的安装（es2015-arrow-functions，es2015-block-scoped-functions等等)。
    presets预设就是设定一些规则，从而将基于你的实际浏览器及运行环境，自动的确定bable插件及polyfills，转译ES2015及此版本以上的语言。
    创建预设，依循命名约定 babel-preset-* 来创建一个新项目
```
* plugins: 插件配置项同预设配置项一样，需要搭配babel相应的插件进行配置。
```
    Babel默认只转换新的JavaScript语法，而不转换新的AP。
    因此需要安装babel-polyfilll，在所有代码运行之前增加 require('babel-polyfill')。
    或者更常规的操作是在 webpack.config.js 中将 babel-polyfill 作为第一个 entry。
    因此必须把 babel-polyfill 作为 dependencies 而不是 devDependencies。
    babel-polyfill主要有两个缺点：1、使用 babel-polyfill 会导致打出来的包非常大 2、babel-polyfill 会污染全局变量
    因此为了解决以上的问题，需要安装插件babel-plugin-transform-runtime
    一般会使用babel-plugin-transform-runtime和babel-polyfill配合使用，对于后者只需要在项目入口文件require引入即可
    babel-plugin-syntax-dynamic-import 解决动态引入的问题 import().then
```
### babel 7.x相比较于babel6.x的变更：
```
    1、preset的变更：淘汰 es201x，删除 stage-x，强推 env (重点)
    2、npm package名称的变化：
    babel-cli 变成了 @babel/cli
    babel-preset-env 变成了 @babel/preset-env。进一步，还可以省略 preset 而简写为 @babel/env。
    babel-plugin-transform-arrow-functions 变成了 @babel/plugin-transform-arrow-functions。
    和 preset 一样，plugin 也可以省略，于是简写为 @babel/transform-arrow-functions
    从而在babelrc中的配置也要相应更改。
```
* 根据以上，我们需要安装以下内容：
```
    npm install --save-dev babel-loader @babel/core 
    npm install --save-dev @babel/preset-env 
    npm install --save @babel/polyfill
    npm install --save-dev @babel/plugin-transform-runtime
    npm install --save-dev @babel/plugin-syntax-dynamic-import
    在webpack.config.js中配置 polyfill
```