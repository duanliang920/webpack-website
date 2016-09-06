var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');//将你的行内样式提取到单独的css文件里，
var HtmlWebpackPlugin = require('html-webpack-plugin'); //html模板生成器
var CleanPlugin = require('clean-webpack-plugin'); // 文件夹清除工具
var CopyWebpackPlugin = require('copy-webpack-plugin'); // 文件拷贝
var config = {
	entry: { //配置入口文件，有几个写几个
		index: './src/js/index.js',
		list: './src/js/list.js',
		about: './src/js/about.js'
	},
	output: {
		path: path.join(__dirname, 'dist'), //打包后生成的目录
		publicPath: '',	//模板、样式、脚本、图片等资源对应的server上的路径
		filename: 'js/[name].[hash:6].js',	//根据对应入口名称，生成对应js名称
		chunkFilename: 'js/[id].chunk.js'   //chunk生成的配置
	},
	resolve: {
		root: [],
         //设置require或import的时候可以不需要带后缀
        extensions: ['', '.js', '.less', '.css']
    },
	module: {
		loaders: [ 
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style', 'css')
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract('css!less')
			},
			{
				test: /\.js$/,
		        loader: 'babel',
		        exclude: /node_modules/,
		        query:{
		        	presets: ['es2015']
		        }
		    },
			{
				test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader?name=./fonts/[name].[ext]'
			},
			{
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 30720, //30kb 图片转base64。设置图片大小，小于此数则转换。
                    name: '../images/[name].[ext]?' //输出目录以及名称
                }
            }
		]
	},
	plugins: [
		new webpack.ProvidePlugin({ //全局配置加载
           $: "jquery",
           jQuery: "jquery",
           "window.jQuery": "jquery"
        }),
        new CleanPlugin(['dist']),// 清空dist文件夹
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common', // 将公共模块提取，生成名为`vendors`的chunk
			minChunks: 3 // 提取至少3个模块共有的部分
		}),
		new ExtractTextPlugin( "css/[name].[hash:6].css"), //提取CSS行内样式，转化为link引入
		new webpack.optimize.UglifyJsPlugin({ // js压缩
	      compress: {
	        warnings: false
	      }
	    }),
	    new CopyWebpackPlugin([
            {from: './src/images', to: './images'} //拷贝图片
        ])
	],
	externals: {
        $: 'jQuery'
    },
    //devtool: '#source-map',
	//使用webpack-dev-server服务器，提高开发效率
	devServer: {
		// contentBase: './',
		host: 'localhost',
		port: 8188, //端口
		inline: true,
		hot: false,
	}
};

module.exports = config;

var pages = Object.keys(getEntry('./src/*.html'));
var confTitle = [ 
	{name: 'index', title: '这是首页标题'},
	{name: 'list', title: '这是列表标题'},
	{name: 'about', title: '这是关于我标题'}
]
//生成HTML模板
pages.forEach(function(pathname) {
	var itemName  = pathname.split('src\\') //根据系统路径来取文件名，window下的做法//,其它系统另测
    var conf = {
        filename: itemName[1] + '.html', //生成的html存放路径，相对于path
        template: pathname + '.html', //html模板路径
        inject: true, //允许插件修改哪些内容，包括head与body
        hash: false, //是否添加hash值
        minify: { //压缩HTML文件
            removeComments: true,//移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }
    };
	conf.chunks = ['common', itemName[1]]
	for (var i in confTitle) { 
		if (confTitle[i].name === itemName[1]) { 
			conf.title = confTitle[i].title
		}
	}
    config.plugins.push(new HtmlWebpackPlugin(conf));
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
        entries[pathname] = './' + entry;
    }
    return entries;
}