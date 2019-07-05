const common = require("./webpack.common");
const merge = require("webpack-merge");

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        //contentBase: "dist", //告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要
        compress: true,
        open: true, // 自动打开
        hot: true, // enable HMR
        proxy: {} // 代理
    }
})