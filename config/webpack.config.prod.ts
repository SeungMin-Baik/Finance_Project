///<reference path="../typings/webpack.d.ts"/>
import * as path from 'path';
import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import { LicenseWebpackPlugin } from 'license-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin';
import * as TerserWebpackPlugin from 'terser-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import * as WebpackMd5Hash from 'webpack-md5-hash';
import baseConfig from './webpack.config.base';

const config: any = merge(baseConfig, {
    mode: 'production',

    entry: {
        main: './src/index.tsx'
    },

    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[id].[chunkhash].js'
    },

    module: {
        rules: [
            /**
             * Stylesheet files.
             */
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader as any,
                        options: {
                            publicPath: path.resolve(__dirname, '..', 'public')
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 0,
                            sourceMap: false
                        }
                    }
                ]
            },

            /**
             * Stylesheet files with SASS.
             */
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader as any,
                        options: {
                            publicPath: path.resolve(__dirname, '..', 'public')
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: false,
                            config: {
                                path: path.resolve(__dirname, 'postcss.config.js')
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: false
                        }
                    }
                ]
            }
        ]
    },

    optimization: {
        minimizer: [
            /**
             * This plugin uses terser to minify your JavaScript.
             * ref: https://github.com/webpack-contrib/terser-webpack-plugin
             */
            new TerserWebpackPlugin({
                cache: true,
                parallel: true,
                sourceMap: false
            }),

            /**
             * A Webpack plugin to optimize and minimize CSS assets.
             * ref: https://github.com/NMFR/optimize-css-assets-webpack-plugin
             */
            new OptimizeCssAssetsWebpackPlugin({
                cssProcessorOptions: {
                    map: false
                }
            })
        ]
    },

    plugins: [
        /**
         * Add production environment.
         * ref: https://webpack.js.org/plugins/define-plugin/
         */
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),

        /**
         * This plugin extracts CSS into separate files.
         * ref: https://github.com/webpack-contrib/mini-css-extract-plugin
         */
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css'
        }),

        /**
         * Plugin to replace a standard webpack chunkhash with md5.
         * ref: https://github.com/erm0l0v/webpack-md5-hash
         */
        new WebpackMd5Hash(),

        /**
         * Outputs licenses from 3rd party libraries to a file.
         * ref: https://github.com/xz64/license-webpack-plugin
         */
        new LicenseWebpackPlugin({
            stats: {
                errors: true,
                warnings: false
            },
            outputFilename: '../dist/licenses.txt',
            unacceptableLicenseTest: (licenseType) => (licenseType === 'GPL'),
            handleUnacceptableLicense: (packageName, licenseType) => {
                throw new Error(`[${packageName}] has unacceptable license type : ${licenseType}`);
            }
        }),

        /**
         * Visualize size of webpack output files with an interactive zoomable treemap.
         * ref: https://github.com/webpack-contrib/webpack-bundle-analyzer
         */
        new BundleAnalyzerPlugin({
            analyzerMode: process.env.BUNDLE_ANALYZER ? 'server' : 'disabled'
        })
    ]
});

export default config;
