const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
require("dotenv").config();

module.exports = merge(common, {
    mode: "production",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]_[contenthash].js",
        clean: true,
    },
    devtool: "source-map",
});
