var path = require("path");
var HtmlwebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'app');
var BUILD_PATH = path.resolve(ROOT_PATH,'build');
// Template的文件夹路径
var TEM_PATH = path.resolve(ROOT_PATH,'templates');

module.exports = {
	entry: {
		app: path.resolve(APP_PATH,'index.js'),
		mobile: path.resolve(APP_PATH,'mobile.js'),
		vendors: ['jquery','moment']
	},
	output: {
		path: BUILD_PATH,
		filename: '[name].[hash].js'
	},
	// devServer:{
	// 	historyApiFallback:true,
	// 	hot:true,
	// 	inline:true,
	// 	progress:true
	// },
	module:{
		loaders:[
			{
				test:/\.scss$/,
				loaders:['style','css','sass'],
				include:APP_PATH
			},
			{
				test:/\.(png|jpg|jpeg)$/,
				loader: 'url?limit=40000'
			},
			{
				test: /\.jsx?$/,
				loader: 'babel',
				include:APP_PATH,
				query:{
					presets:['es2015']
				}
			}
		]
		// ,perLoaders : [
		// 	{
		// 		test: /\.jsx?$/,
		// 		include:APP_PATH,
		// 		loader: 'jshint-loader'
		// 	}
		// ]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({minimize:true}),
		new HtmlwebpackPlugin({
			title:"Hello World app",
			templates: path.resolve(TEM_PATH,'index.html'),
			filename:'index.html',
			// chunks这个参数告诉插件要引用entry里面的哪几个入口
			chunks:['app','vendors'],
			// 要把script插入到标签里
			inject:'body'
		}),
		new HtmlwebpackPlugin({
			title:"Hello Mobile app",
			templates: path.resolve(TEM_PATH,'mobile.html'),
			filename:'mobile.html',
			// chunks这个参数告诉插件要引用entry里面的哪几个入口
			chunks:['mobile','vendors'],
			// 要把script插入到标签里
			inject:'body'
		}),
		// 把入口文件里面的数组打包成verdors.js
		new webpack.optimize.CommonsChunkPlugin('vendors','vendors.js')
	],
	devtool : 'eval-source-map'
	// ,jshint : {
	// 	"esnext" : true
	// }
};