const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');



module.exports = {
    entry: './src/ts/app.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                use: [
                    { loader: "ts-loader" }
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.mp3$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'file-loader' }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                exclude: /node_modules/,
                use:
                   [ 'file-loader' ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
}
