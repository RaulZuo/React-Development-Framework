var path = require('path');
var glob = require('glob');

const prefix = './app/';

var entries = getEntry(prefix + '**/index.js', prefix);
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: entries,
    output: {
        path: path.resolve(__dirname, 'build/static'),
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[id].js'
    },
    module: {
        loaders: [{
            test: /\.js[x]?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(["style-loader", "css-loader"])
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract([{
                loader: "css-loader",
                options: { minimize: true}
            }, "less-loader"])
        },{
            test: /\.(png|jpg)$/,
            loader: 'url?limit=25000'
        }]
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ]
};

/**
 * 解析 entry 路径
 * */
function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, pathname;
    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        pathname = dirname.replace(new RegExp('^' + pathDir), '');
        entries[pathname] = './' + entry;
    }
    return entries;
}