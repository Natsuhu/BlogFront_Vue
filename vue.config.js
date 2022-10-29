const webpack = require('webpack')

module.exports = {
	runtimeCompiler: true,
	publicPath: './',
	
	configureWebpack: {
		plugins: [
			new webpack.ProvidePlugin({
				$: "jquery",
				jQuery: "jquery",
				jquery: "jquery",
				"window.jQuery": "jquery",
			})
		]
	}
	
}