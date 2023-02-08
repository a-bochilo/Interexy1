const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
require("dotenv").config();

module.exports = {
    entry: ["./src/app.js"],
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
            title: "Web-pack test",
            filename: "index.html",
            template: "./src/index.html",
        }),
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin({
            patterns: [{ from: "./src/worker.js", to: "./" }],
        }),
    ],
};
