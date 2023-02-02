const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
    entry: "./app.js",
    module: {
        rules: [
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "index.js",
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: "Web-pack test",
            filename: "index.html",
            template: "./index.html",
        }),
        new MiniCssExtractPlugin(),
    ],
    mode: process.env.NODE_ENV == "production" ? "production" : "development",
};

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
    console.log("Hello");
    config.devtool = "source-map";
}

console.log(JSON.stringify(config));
module.exports = config;
