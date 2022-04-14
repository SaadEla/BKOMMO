const path = require('path')
var nodeExternals = require('webpack-node-externals');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

        //externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
        entry: './src/index.js',
        module: {

                rules: [
                        {
                                test: /\.(js|jsx)$/,
                                exclude: /node_modules/,
                                use: {
                                        loader: "babel-loader"
                                }
                        },
                        {
                                test: /\.css$/,
                                use: [
                                        {
                                                loader: 'style-loader',
                                        },
                                        {
                                                loader: 'css-loader'
                                        }
                                ]
                        },
                        {
                                test: /\.(png|woff|woff2|eot|ttf|svg|PNG|jpeg|jpg)$/,
                                use: [
                                        {
                                                loader: 'file-loader',
                                                options: {
                                                        sourceMap: true,
                                                        minimize: false,
                                                }
                                        },

                                ]
                        },

                ]
        },
        output: {
                path: path.resolve(__dirname, 'dist'),
                filename: 'bundle.js'
        },

        devServer: {
              // historyApiFallback: true,
                host: 'localhost',
                port: 3000
        },
        plugins: [
                new HtmlWebpackPlugin({
                        inject: false,
                        hash: true,
                        template: './public/index.html',
                        filename: 'index.html'
                })]

};
