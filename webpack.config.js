'use strict';

const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        app: path.join(__dirname, 'src/index.tsx'),
    },
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '',
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].chunk.js',
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                    },
                ],
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            automaticNameDelimiter: '.',
        },
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new ESLintPlugin({ extensions: ['ts', 'tsx'] }),
        new HtmlWebpackPlugin({
            inject: 'head',
            filename: 'index.html',
            template: 'src/index.html',
            favicon: 'favicon.png',
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].chunk.css',
        }),
    ],
    devServer: {
        port: 3000,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods':
                'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers':
                'X-Requested-With, content-type, Authorization',
        },
    },
};
