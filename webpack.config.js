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
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: isDev ? '[name].js' : '[name].min.js',
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
        static: path.resolve(__dirname, './dist'),
        watchFiles: ['src/*.js'],
    }
}

module.exports = config;