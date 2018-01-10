const path = require('path')
const glob = require('glob');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin'); //html模板生成器

let baseConfig = {
    entry: {
        index: path.resolve(__dirname, '../src/js/index.js'),
        list: path.resolve(__dirname, '../src/js/list.js'),
        about: path.resolve(__dirname, '../src/js/about.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].js',
        publicPath: ''
    },

    module: {
        rules: [

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'babel-loader?cacheDirectory' } //开启 babel-loader 缓存 ?cacheDirectory
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [

                    {
                        loader: 'url-loader',
                        options: {
                            limit: 20000,
                            name: 'images/[name].[hash:8].[ext]'
                        }
                    }
                ]

            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [

                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100000,
                            name: 'fonts/[name].[hash:7].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        // 该项配置能够在加载资源的时候省略后缀名
        extensions: ['.js', '.json', '.css', '.less'],
        // 配置路径别名
        alias: {
            '@src': path.resolve(__dirname, '../src'),
            '@images': path.resolve(__dirname, '../src/images/'),
            '@js': path.resolve(__dirname, '../src/js/'),
            '@less': path.resolve(__dirname, '../src/less/'),
        }
    },
    plugins: [
        new webpack.ProvidePlugin({ //全局配置加载
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
}

var pages = Object.keys(getEntry('./src/*.html'));
var confTitle = [
    { name: 'index', title: '这是首页标题' },
    { name: 'list', title: '这是列表标题' },
    { name: 'about', title: '这是关于我标题' }
]

//生成HTML模板
pages.forEach((pathname) => {
    var conf = {
        filename: pathname + '.html', //生成的html存放路径，相对于path
        template: path.resolve(__dirname, '../src/' + pathname + '.html'), //html模板路径
        inject: true, //允许插件修改哪些内容，包括head与body
        hash: false, //是否添加hash值
        minify: { //压缩HTML文件
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }
    };
    conf.chunks = ['mainifest', 'vendor', pathname]
    for (var i in confTitle) {
        if (confTitle[i].name === pathname) {
            conf.title = confTitle[i].title
        }
    }
    baseConfig.plugins.push(new HtmlWebpackPlugin(conf));
});


//按文件名来获取入口文件（即需要生成的模板文件数量）
function getEntry(globPath) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        entries[basename] = basename;
    }
    return entries;
}

module.exports = baseConfig