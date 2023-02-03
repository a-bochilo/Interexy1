const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
let name =
    process.env.NODE_ENV === "production" ? "index_[contenthash]" : "index";

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
        filename: `${name}.js`,
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: "Web-pack test",
            filename: `${name}.html`,
            template: "./index.html",
        }),
        new MiniCssExtractPlugin(),
    ],
    mode: "development",
};

if (process.env.NODE_ENV === "production") {
    config.mode = "production";
    config.devtool = "source-map";
}

console.log(JSON.stringify(config));
module.exports = config;
