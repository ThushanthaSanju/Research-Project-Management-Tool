const HtmlWebPackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});
const definePlugin = new DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
});

module.exports = {
    mode: 'development',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        },
        {
            test: /\.(jpe?g|gif|png|svg)$/i,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }
            ]
        }
        ]
    },
    plugins: [htmlPlugin, definePlugin]
};