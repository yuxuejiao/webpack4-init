const common = require("./webpack.common");
const merge = require("webpack-merge");
module.exports = merge(common, {
    mode: "production",
    //devtool: "source-map", // 方便debug
    plugins: []
})