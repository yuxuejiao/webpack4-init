const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const isDevMode = process.env.NODE_ENV !== 'production';
module.exports = {
    //entry: ["@babel/polyfill", path.resolve(__dirname, '../src/index.js')],
    entry: {
        main: ["@babel/polyfill", path.resolve(__dirname, '../src/index.js')]    
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "bundle.[hash].js", // name对应entry对象的属性名
        chunkFilename: "[name].[id].[chunkhash].js" // 修改业务代码时不影响该文件的变化
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/ //只包含第三方库，不包含业务代码
                },
                styles: {
                    name: 'styles',
                    chunks: 'all',
                    test: /\.(css|sass|scss)$/,
                    enforce: true 
                }
            }
        },
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true
                    },
                    output: {
                        comments: false
                    }
                   
                }     
            }),
            new OptimizeCSSAssetsPlugin()
        ]
    },
    externals: {
        "moment": "moment",
        "lodash": "_", // key 是 require 的包名，value 是全局的变量
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, '../src'),
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {}
                }
            },
            {
                test: /\.(css|scss|sass)/,
                use: [isDevMode ? 'style-loader': MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                exclude: /node_modules/,
                include: path.resolve(__dirname, '../src')
            }
           

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'), // 参照的模板文件
            filename: "index.html" // 重新定义新生成的文件名
        }),
        new CleanWebpackPlugin({
            verbose: true // 输出日志
        }),
        new MiniCssExtractPlugin()
    ]
}