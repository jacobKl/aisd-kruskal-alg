const path = require('path');
module.exports = {
	entry: {
		index: './script.ts',
    },
	output: {
	    path: path.resolve(__dirname, './dist'),
		filename: '[name].bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
          }
        ]
      },
      resolve: {
        extensions: [ '.tsx', '.ts' ]
      },
      watch: true
};