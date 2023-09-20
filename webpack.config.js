//webpack.config.js
const path = require('path');
const PugPlugin = require('pug-plugin');
const {sync} = require("glob");

const PATHS = {
    src: path.join(__dirname, "src"),
};

module.exports = {
    entry: {
        index: './src/index.pug',
        ...sync('./src/branches/**.pug').reduce(function(obj, el){
            obj['branches/' + path.parse(el).name] = el;
            return obj
        },{})
    },
    output: {
        path: path.resolve(__dirname, 'dist', ),
        filename: 'js/[name].js'
    },
    plugins: [
        new PugPlugin({
            pretty: true,
            css: {
                filename: 'css/[name].css'
            }
        })
    ],
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: PugPlugin.loader
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'postcss-loader'
                }, {
                    loader: 'sass-loader'
                }]
            },
            {
                test: /\.css$/,
                use:  'css-loader'
            },
            {
                test: /\.(png|jpg|jpeg|ico|webp)/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[name][ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext][query]'
                }
            },
            {
                test: /\.(svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/icons/[name][ext][query]'
                }
            }
        ]
    },
    devServer: {
        open: true,
        static: {
            directory: './src',
            watch: true
        },
        compress: true,
        port: 9000,
    },
    performance: {
        hints: false
    }
};
