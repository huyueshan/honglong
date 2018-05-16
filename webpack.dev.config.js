var path = require('path');
var webpack = require('webpack');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var publicPath = '';

module.exports = {
    entry: {
        bootstrap: [__dirname + '/src/app/app.module.ts', 'webpack-hot-middleware/client?reload=true'],
        polyfill: ['zone.js/dist/zone', 'reflect-metadata'],
        thirdparty: ['jquery', 'flatpickr', 'echarts']
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'js/[name].js',
        chunkFilename: 'js/chunk-[id].js',  //主要用于按需加载,生成块状文件
        publicPath: ''  //存放静态资源的文件路径
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: [
                    '@angularclass/hmr-loader',
                    'awesome-typescript-loader',
                    'angular2-template-loader',
                    'angular2-router-loader'
                ]
            }, {
                test: /\.html$/,
                loader: 'html-loader',
                include: path.join(__dirname, 'src/')
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    name: 'images/[name].[ext]',
                    limit: 100
                }
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            }, {
				test: /\.less$/,
				exclude: [
                    path.join(__dirname, 'src/app')
                ],
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!less-loader' })
            }, {
                test: /\.less$/,
                include: [
                    path.join(__dirname, 'src/app')
                ],
                loaders: [
                    'to-string-loader',
                    'css-loader',
                    'less-loader'
                ]
            },{
                test: /\.scss$/,
                exclude: [
                    path.join(__dirname, 'src/app')
                ],
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
            }, {
                test: /\.scss$/,
                include: [
                    path.join(__dirname, 'src/app')
                ],
                loaders: [
                    'to-string-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }, {
                test: /\.ejs$/,
                loader: 'ejs-loader'
            }, {
                test: /jquery/,
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new ProgressBarPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new DefinePlugin({
            'ENV': '"dev"'
        }),
		new webpack.ContextReplacementPlugin(
		  /angular(\\|\/)core(\\|\/)@angular/,
		  path.resolve(__dirname, 'src')
		),
        new ExtractTextPlugin('css/[name].css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + '/src/index.html'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Flatpickr: 'flatpickr',
            echarts: 'echarts'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: [
                'bootstrap',
                'polyfill',
                'thirdparty'
            ]
        }),
        new AddAssetHtmlPlugin([
            { filepath: require.resolve('./dll/angular.dll.js') }
        ]),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(path.join(__dirname, 'dll/angular-manifest.json'))
        })
    ],
    devtool: 'source-map' //'cheap-module-source-map' | 'source-map'
}