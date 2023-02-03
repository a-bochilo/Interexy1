const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
require("dotenv").config();

module.exports = merge(common, {
    mode: "production",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index_[contenthash].js",
        clean: true,
    },
    devtool: "source-map",
});
