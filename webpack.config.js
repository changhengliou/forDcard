var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var isDevBuild = false;
module.exports = {
    entry: {
        main: ['./public/app.js']
    },
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: "/dist/",
        filename: '[name].js',
        chunkFilename: "[id].chunk.js"
    },
    module: {
        rules: [{
                test: /\.js(x?)$/,
                include: path.join(__dirname, 'public'),
                exclude: path.join(__dirname, 'node_modules'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: isDevBuild,
                        babelrc: false,
                        presets: [
                            ['env', {
                                targets: { "browsers": ["last 2 versions", "ie >= 7"] },
                                modules: false,
                                useBuiltIns: false,
                                debug: false,
                            }],
                            "react", "es2015", "stage-0"
                        ],
                        plugins: ["transform-runtime", "transform-react-constant-elements", "transform-react-inline-elements"]
                    }
                }
            },
            { test: /\.css$/, use: ExtractTextPlugin.extract({ use: 'css-loader' }) },
            { test: /\.(png|jpg|jpeg|gif|svg|ttf)$/, use: 'url-loader?limit=25000' },
        ]
    },
    plugins: isDevBuild ? [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new ExtractTextPlugin('/css/[name].css'),
    ] : [
        new webpack.optimize.CommonsChunkPlugin({ filename: "commons.js", name: "commons" }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('/css/[name].css'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        })
    ]
};