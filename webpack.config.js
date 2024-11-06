'use strict';

const isProduction = process.env.NODE_ENV === 'production';

const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');

module.exports = {
    mode: isProduction ? 'production' : 'development',
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
        alias: {
            src: path.resolve(__dirname, 'src'), // webpack won't find src/* paths without this alias
        },
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
                            getCustomTransformers: () => ({
                                before: [
                                    !isProduction && ReactRefreshTypeScript(),
                                ].filter(Boolean),
                            }),
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
                            sourceMap: !isProduction,
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
        !isProduction && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
    devServer: {
        port: 3000,
        hot: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods':
                'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers':
                'X-Requested-With, content-type, Authorization',
        },
    },
};
