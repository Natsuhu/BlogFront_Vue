module.exports = {
	presets: [
		'@vue/app'
	],
  
	plugins: [
	  ['prismjs', {
		'languages': ['javascript', 'css', 'markup', 'python'],
		'plugins': ['line-numbers'],
		'theme': 'tomorrow',
		'css': true
	  }]
	]
}
