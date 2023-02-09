const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
require("dotenv").config();

module.exports = {
    entry: {
        app: "./src/app.js",
        worker: "./src/scripts/worker.js",
    },
    module: {
        rules: [
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: "Interexy study project",
            filename: "index.html",
            template: "./src/index.html",
            excludeChunks: ["worker"],
        }),
        new MiniCssExtractPlugin(),
        // new CopyWebpackPlugin({
        //     patterns: [{ from: "./src/scripts/worker.js", to: "./" }],
        // }),
    ],
};
