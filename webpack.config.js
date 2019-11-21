const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const isDevelopment = process.env.NODE_ENV !== 'production';
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    entry: './src/ts/app.ts',
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: isDevelopment ? '[name].js' : '[name].[hash].js'
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
                test: /\.ogg$/,
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
