


const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");



module.exports = {
    entry:{
        index:__dirname+"/src/js/index.js",
        list:__dirname+"/src/js/list.js",
    },
    output: {
        path: path.join(__dirname, "dist"),//打包后的文件存放的地方
        publicPath:"/",
        filename: "js/[hash][name].js",//打包后输出文件的文件名
        chunkFilename: 'js/[id].chunk.js'   //chunk生成的配置
    },
    resolve:{
        extensions: [".js",".css",".less"]
    },
    devtool: 'inline-source-map',
    module:{
        rules:[
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",//应用于当 CSS 没有被提取
                    use: [{
                        loader:"css-loader",//将资源转换成一个CSS导出模块
                        options:{
                        }
                    }]
                })
            },
            { test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(eot|ttf|woff|woff2|otf)/,
                loader: 'file-loader?name=./font/[name].[ext]'
            },
            {
                test: /\.(svg|png|jpg|ico)/,                    
                loader: 'url-loader?limit=8192&name=./image/[hash].[ext]'
            },
            {
                test: /\.(html|ftl)/,
                loader: "html-loader?attrs=img:src img:data-src"
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            }
        ]
    },

    devtool: 'eval-source-map',//开发阶段使用，使调试更容易
    devServer: {
        contentBase: "./",//本地服务器所加载的页面所在的目录
        port: 3030, //默认8080
        inline: true, //可以监控js变化
        hot: true//热启动
    },
    plugins:[
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new ExtractTextPlugin({filename:"style/[name].css?[contenthash]"}),//单独使用link标签加载css并设置路径，
        new webpack.HotModuleReplacementPlugin(),//模块热替换，允许运行时更新各种模块，无需进行完全更新

        new CleanWebpackPlugin(["dist"]),//A webpack plugin to remove/clean your build folder(s) before building

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
            chunks: ['index','list'], //提取哪些模块共有的部分
            minChunks: 2 // 提取至少2个模块共有的部分
        }),
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            filename: './view/index.html', //生成的html存放路径，相对于path
            template: './src/view/index.ftl', //html模板路径
            inject: true, //js插入的位置，true/'head'/'body'/false
            hash: true, //为静态资源生成hash值
            chunks: ['vendors', 'index'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        new HtmlWebpackPlugin({ 
            filename: './view/list.html',
            template: './src/view/list.ftl', 
            inject: true, 
            hash: true, 
            chunks: ['vendors', 'list'],
            minify: { 
                removeComments: true, 
                collapseWhitespace: false 
            }
        })
]
}