var path = require('path');

module.exports = {
  entry: {
    app: './resources/react/app/index.jsx',
    login: './resources/react/login/index.jsx',
    register: './resources/react/register/index.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
        query: {
          presets: ['react', 'es2015'],
          plugins: ["transform-object-rest-spread", "transform-class-properties"]
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    alias: {
      Actions: path.resolve(__dirname, 'resources/react/app/actions'),
      Components: path.resolve(__dirname, 'resources/react/app/components'),
      Containers: path.resolve(__dirname, 'resources/react/app/containers'),
      Reducers: path.resolve(__dirname, 'resources/react/app/reducers')
    },
    extensions: [".js", ".jsx"]
  }
};

