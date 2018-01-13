var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    // 入口文件配置
    entry: "./src/main.js",

    // 输出配置
    output: {
        // 输出的路径
        path: path.join(__dirname, 'dist'),
        // 静态资源在服务器上运行时的访问路径，可以直接http://localhost:8080/dist/bundle.js访问到服务器中的bundle.js文件
        // publicPath: '/dist',
        // 输出文件名字
        filename: "bundle.js"
    },
    module: {
        rules: [
            // 配置的是用来解析.css文件的loader(style-loader和css-loader)
            {
                // 1.0 用正则匹配当前访问的文件的后缀名是  .css
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] //webpack底层调用这些包的顺序是从右到左
            }, 
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/, // node_modules下面的.js文件会被排除
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(png|jpg|gif|ttf|woff)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        //当图片大于设置的limit的值  那么是一个图片的名字   当小于指定大小的时候   是一个base64的格式
                        limit: 5000
                    }
                }]
            },
            //解析.vue文件
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ]
}

