const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
require("dotenv").config();

module.exports = merge(common, {
    mode: "development",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        clean: true,
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, "dist"),
        },
        host: process.env.BASE_URL,
        port: process.env.PORT,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
});
