const path = require('path');
const miniCss = require('mini-css-extract-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './source/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        port: 3000
    },
    module: {
        rules: [{
            test: /\.(s*)css$/,
            use: [
                miniCss.loader,
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    plugins: [
        new miniCss({
            filename: './css/style.css'
        }),
        new HtmlWebpackPlugin({
            template: './source/html/index.html'
        })
    ]
}