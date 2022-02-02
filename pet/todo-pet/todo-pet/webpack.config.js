const path = require('path');
const miniCss = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './source/js/index.js',
    output: {
        path: path.resolve(__dirname, 'js'),
        filename: 'bundle.js'
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
            filename: '../css/style.css'
        })
    ]
}