const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest, GenerateSW } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E.'
      }),
      // We already have a service worker file, so we will use inject manifest rather than generating a new sw file. The source is the sw file already in the client folder and the new file name is 'src-sw.js', where the file will be outputted
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        // inject successfully injects the manifest.json file in the index.html
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E.',
        description: 'A text editor',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        // publicPath tells webpack where to path this 
        publicPath: '/',
        icons: [
          {
            // getting icon image from the source
            src: path.resolve('src/images/logo.png'),
            // telling manifest what sizes to create the icons
            sizes: [96, 128, 192, 256, 384, 512],
            // output goes to the assets folder in the dist folder, not at the root of the dist folder
            destination: path.join('assets', 'icons'),
          }
        ]
      })
      
    ],

    module: {
      // CSS loaders
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // We use babel-loader in order to use ES6.
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
