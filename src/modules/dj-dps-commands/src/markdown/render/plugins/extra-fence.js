const markdownitfence = require('markdown-it-fence')

module.exports = (md, opts) => markdownitfence(
	md, 
	'extra-fence', 
	{
    	render: (tokens, idx) => tokens[idx].content.trim()
  	})
