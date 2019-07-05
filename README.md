## webpack 4.x 配置
### webpack环境独立配置
```
development开发环境和production生产环境这两个环境构建目标存在很多差异。 
开发环境中需要强大的source map和一个有着live reloading（实时重新加载）或 hot module replacement（热模块替换能力）的localhost server。 
生产环境关注点在与压缩bundle， 更轻量的source map、 资源优化。
从而我们会将开发环境和生产环境编写独立的webpack配置，但是为了不重复编写一些基本配置，会有一个common配置文件，通过webpack-merge工具进行整合。 
```

### webpack common config
主要以下四点：
* entry入口
* output输出
* loader
* plugins插件

### entry/output
webpack4 默认配置了 entry（入口） src/index.js 和output（出口） dist/main.js   
entry: String/Array<string> 单个入口或多个入口   
output: { path: 目标输出目录 path 的绝对路径, filename: 用于输出的文件名, publicPath: 上线时配置的是cdn的地址}   

#### 使用loader的三种方式： 
* 配置（推荐）： 在 webpack.config.js 文件中指定 loader。 
* 内联： 在每个 import 语句中显式指定 loader。 
* CLI： 在 shell 命令中指定它们。    
module.rules 允许你在 webpack 配置中指定多个 loader

#### babel-loader   
babel -> Babel 是一个工具链， 主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法， 
以便能够运行在当前和旧版本的浏览器或其他环境中。 
* 首先配置 .babelrc
* 安装相应的 presets和plugins
* 在webpack.config.js中配置 polyfill和rules

#### css-loader
* 支持加载css文件   
安装style-loader 和 css-loader, 可以将 css 文件转换成JS文件类型   
* 支持编译sass   
npm install --save-dev style-loader css-loader node-sass sass-loader   

### 版本更新/缓存问题 -> 引入模板html
```
若是不同版本打包生成的文件名一样，浏览器不会加载新的文件，会读取缓存的文件。
从而我们需要给打包生成的js文件名加上hash值。因此html文件不能手动编写，需要使用模板html。
html-webpack-plugin 
可以指定template模板文件， 将会在output目录下， 生成html文件， 并引入打包后的js.
npm install --save-dev html-webpack-plugin
```

### 打包前清空输出目录dist
```
使用插件clean-webpack-plugin
npm install --save-dev clean-webpack-plugin
dev模式和build模式都使用
```

### scripts脚本
```
调用webpack-dev-server或webapack工具执行webpack.config.js(默认文件)
"scripts": {
    "dev": "webpack-dev-server",
    "build": "webpack"，
}
当要指定特殊的文件，使用--config
"scripts": {
    "build": "webpack --config config/webpack.prod.js",
    "start": "webpack-dev-server --config config/webpack.dev.js"
}
```

### 独立打包 - 分离第三方库
```
若是引入其他库，运行npm run build后查看bundle.xxx.js，发现引入第三方库lodash之后js文件的size从86kb增大到156库。
output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "[name].[chunkhash].js", // name对应entry对象的属性名
    chunkFilename: "[id].[chunkhash].js"
},
optimization: {
    splitChunks: {
        cacheGroups: {
            vendors: {
                name: 'vendors',
                chunks: 'all',
                test: /lodash|moment/
            }
        }
    }
},
1、需要加入optimation配置，此时生成的文件会包含vendors文件，但是vendors文件中包含了业务代码，所以需要在test中写一个正则，只包含第三方库
2、当修改业务代码，不想要修改vendors.xxx.js，从而需要在output中加入chunkFilename

PS: 网上解决方案大多是引入CommonsChunkPlugin来解决。但是在webpack4中
webpack.optimize.CommonsChunkPlugin has been removed, please use config.optimization.splitChunks instead.

```

### 第三方库打包体积过大 - 外部引入模块 cdn
```
开发中常用的模块，如moment, lodash体积都较大，可以考虑外部引入，不参与打包。然后在externals中配置从而可以使用CMD/AMD/全局等方式引入。
在index.html中使用script引入cdn
externals: {
    'moment': 'moment',
    'lodash': '_'
}
```

### 分离css代码并压缩
```
mini-css-extract-plugin 和 optimize-css-assets-webpack-plugin 插件

```

### 压缩打包后的js文件 - terser-webpack-plugin

### 减小打包后的文件体积
```
1、分离第三方库独立打包，使用cdn加载体积较大的第三方库 
2、分离css代码独立打包，压缩css代码
3、按需异步加载模块，异步路由 
4、使用插件 terser-webpack-plugin对打包后的js文件进行压缩，在生产环境移除注释，console等无用代码

```

