'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        app: path.join(__dirname, 'src/index.tsx')
    },
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '',
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].chunk.js'
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loaders: ['awesome-typescript-loader']
            },
            {
                test: /\.(s)?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            sourceMap: true,
                            publicPath: '../'
                        }
                    },
                    {
                        loader: "css-modules-typescript-loader"
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            automaticNameDelimiter: '.'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'head',
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].chunk.css'
        })
    ],
    devServer: {
        contentBase: 'build',
        port: 3000,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
        }
    }
};
