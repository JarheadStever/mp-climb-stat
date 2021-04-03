// Generated using webpack-cli http://github.com/webpack-cli
const path = require('path');
const webpack = require("webpack");

module.exports = {
    mode: 'development',
    entry: './src-js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
    },
    devServer: {
        open: true,
        contentBase: path.join(__dirname, 'dist'),
        host: 'localhost',
        port:3000
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react',
                    ]
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader','css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};
