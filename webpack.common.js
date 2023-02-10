const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
require("dotenv").config();

module.exports = {
    entry: {
        app: "./src/app",
        worker: "./src/scripts/worker",
        chartWorker: "./src/scripts/chartWorker",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                enforce: "pre",
                use: ["source-map-loader"],
            },
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: "Interexy study project",
            filename: "index.html",
            template: "./src/index.html",
            excludeChunks: ["worker", "chartWorker"],
        }),
        new MiniCssExtractPlugin(),
    ],
};
