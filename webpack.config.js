const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === "dev";

let config = {
    devtool: isDev ? 'source-map' : false,
    mode: isDev ? 'development' : 'production',
    entry: {'gZoom-move' : path.resolve(__dirname, `./src/gZoomMove.js`)},
    experiments: {
        outputModule: true
    },
    output: {
        environment: {
            module: true
        },
        path: isDev ? path.resolve(__dirname, './docs') : path.resolve(__dirname, '.'),
        publicPath: '/',
        filename: isDev ? '[name].mjs' : '[name].min.mjs',
        library: {
            type: 'module'
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    optimization: {
        minimize: !isDev,
        minimizer: [
            new TerserPlugin()
        ]
    },
    devServer: {
        static: path.resolve(__dirname, './docs'),
        watchFiles: ['src/*.js'],
    }
}

module.exports = config;