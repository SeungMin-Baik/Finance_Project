///<reference path='../typings/webpack.d.ts'/>
import * as path from 'path';
import * as webpack from 'webpack';
// import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as ProgressBarWebpackPlugin from 'progress-bar-webpack-plugin';
import * as WebpackManifestPlugin from 'webpack-manifest-plugin';
import { CheckerPlugin } from 'awesome-typescript-loader';
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

/** Babel configuration. */
const babelConfig = {
    presets: [
        '@babel/preset-react',
        ['@babel/preset-env', {
            targets: {
                browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9'
                ]
            }
        }]
    ],
    plugins: [
        '@babel/plugin-syntax-dynamic-import',
        ['@babel/plugin-transform-runtime', {
            regenerator: true
        }],
        'react-loadable/babel'
    ]
};

/** Webpack base configuration. */
const config: any = {
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            '@app': path.resolve(__dirname, '..', 'src'),
            '@public': path.resolve(__dirname, '..', 'public')
        }
    },

    module: {
        rules: [
            /**
             * Run babel at JS files to transfile ES6+ code to ES5.
             */
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        ...babelConfig,
                        cacheDirectory: true,
                        compact: true
                    }
                }
            },

            /**
             * Transfile TS files or TSX files to JS files.
             * And run babel at JS files to transfile ES6+ code to ES5.
             */
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFileName: 'tsconfig.build.json',
                        silent: true,
                        useBabel: true,
                        useCache : true,
                        babelCore: '@babel/core',
                        babelOptions: {
                            babelrc: false,
                            ...babelConfig
                        }
                    }
                }
            },

            /**
             * Stylesheet files.
             */
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 0,
                            sourceMap: true
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
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
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
            },

            /**
             * Make inline in bundle file if smaller than 10 KB,
             * otherwise load as a file.
             */
            {
                test: /\.(png|ico|gif|svg|webp|jpe?g|mp4|webm)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'public/media/[hash].[ext]'
                    }
                }]
            },

            /**
             * Make font resources load as files.
             */
            {
                test: /\.(eot|ttf|woff2?|otf)$/,
                use: 'file-loader'
            }
        ]
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    name: 'common',
                    chunks: 'async',
                    minChunks: 2,
                    priority: 10,
                    reuseExistingChunk: true,
                    enforce: true
                },

                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: 20
                },

                default: false,
                vendors: false
            }
        }
    },

    plugins: [
        /**
         * Remove and clean your build folder before building.
         * ref: https://github.com/johnagan/clean-webpack-plugin
         */
        // new CleanWebpackPlugin(
        //     [ path.resolve(__dirname, '..', 'dist') ],
        //     { root: process.cwd() }
        // ),

        /**
         * Copies individual files or entire directories to the build directory.
         * ref: https://github.com/webpack-contrib/copy-webpack-plugin
         */
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '..', 'public', 'locales'),
                to: 'public/locales/'
            },
            {
                from: path.resolve(__dirname, '..', 'public', 'manifest.json'),
                to: '',
                toType: 'file',
                force: true
            }
        ]),

        /**
         * Runs typescript type checker on a separate process.
         * ref: https://github.com/Realytics/fork-ts-checker-webpack-plugin
         */
        new ForkTsCheckerWebpackPlugin({
            async: false,
            watch: path.resolve(__dirname, '..', 'src'),
            tsconfig: path.resolve(__dirname, '..', 'tsconfig.build.json'),
            tslint: path.resolve(__dirname, '..', 'tslint.json'),
        }),

        /**
         * Prevent generation of modules.
         * In this app, prevent to load all moment locales.
         * ref: https://webpack.js.org/plugins/ignore-plugin/
         */
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

        /**
         * Use it if you want async error reporting with awesome-typescript-loader.
         * ref: https://github.com/s-panferov/awesome-typescript-loader#configuration
         */
        new CheckerPlugin(),

        /**
         * Plugin that simplifies creation of HTML files to serve your bundles
         * ref: https://github.com/jantimon/html-webpack-plugin
         */
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', 'public', 'index.html'),
            filename: 'index.html',
            inject: 'body',
            hash: true,
            minify: {
                collapseWhitespace: true,
                preserveLineBreaks: false
            }
        }),

        /**
         * Webpack plugin for generating an asset manifest.
         * ref: https://github.com/danethurber/webpack-manifest-plugin
         */
        new WebpackManifestPlugin({
            fileName: 'assets.json',
            writeToFileEmit: true
        }),

        /**
         * A progress bar plugin for Webpack.
         * ref: https://github.com/clessg/progress-bar-webpack-plugin
         */
        new ProgressBarWebpackPlugin(),

        /**
         * Recognizes certain classes of webpack errors and cleans, aggregates and prioritizes them.
         * ref: https://github.com/geowarin/friendly-errors-webpack-plugin
         */
        new FriendlyErrorsWebpackPlugin()
    ],

    /**
     * Configure whether to polyfill or mock certain Node.js globals and modules.
     * ref: https://webpack.js.org/configuration/node/
     */
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
};

export default config;
