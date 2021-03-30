const path = require('path'),
  glob = require('glob'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  safePostCssParser = require('postcss-safe-parser'),
  PurgecssPlugin = require('purgecss-webpack-plugin'),
  UglifyJsPlugin = require("uglifyjs-webpack-plugin"),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  CompressionPlugin = require('compression-webpack-plugin'),
  ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'),
  OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
  AsyncStylesheetWebpackPlugin = require('async-stylesheet-webpack-plugin')
PATHS = {
  app: path.join(__dirname, 'app'),
  entry: path.join(__dirname, 'app/index.js'),
  components: path.join(__dirname, 'app/components'),
  images: path.join(__dirname, 'app/images'),
  css: path.join(__dirname, 'app/css'),
  apis: path.join(__dirname, 'app/apis'),
  actions: path.join(__dirname, 'app/actions'),
  utils: path.join(__dirname, 'app/utils'),
  reducers: path.join(__dirname, 'app/reducers'),
  routes: path.join(__dirname, 'app/routes.js'),
  stateToProps: path.join(__dirname, 'app/stateToProps.js'),
  preFilledTemplates: path.join(__dirname, 'app/preFilledTemplates'),
  build: path.join(__dirname, 'build'),
  buildJs: 'js',
  buildImages: 'images',
  buildFonts: 'fonts',
  buildCss: 'css'
}

module.exports = {
  mode: 'production',
  entry: {
    app: [
      PATHS.entry
    ]
  },
  output: {
    path: PATHS.build,
    publicPath: '/ui/',
    filename: `${PATHS.buildJs}/[name].js`,
    chunkFilename: `${PATHS.buildJs}/[name].[contenthash:8].js`
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.css', '.scss'],
    alias: {
      "components": PATHS.components,
      "css": PATHS.css,
      "images": PATHS.images,
      "apis": PATHS.apis,
      "actions": PATHS.actions,
      "utils": PATHS.utils,
      "routes": PATHS.routes,
      "reducers": PATHS.reducers,
      "stateToProps": PATHS.stateToProps,
      "preFilledTemplates": PATHS.preFilledTemplates

    }
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: PATHS.buildImages
            }
          },
        ]
      },
      {
        test: /\.(woff2|ttf|woff|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: PATHS.buildFonts
            }
          },
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    //To clear the destination directory before webpack build
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      title: 'PhonePe Valhalla',
      inject: true,
      template: path.join(PATHS.app, 'index.html'),
      chunksSortMode: 'none',
      hash: true
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    new MiniCssExtractPlugin({
      filename: `${PATHS.buildCss}/[name].[contenthash:8].css`,
      chunkFilename: `${PATHS.buildCss}/[name].[id].[contenthash:8].css`,
    }),
    new AsyncStylesheetWebpackPlugin({
      preloadPolyfill: true,
      noscriptFallback: true
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.app}/**/*`, { nodir: true }),
    }),
    new CompressionPlugin({
      algorithm: "gzip",
      test: /\*.js$|\*.css$|\*.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  optimization: {
    minimizer: [
      //To minimize your generated js file
      new UglifyJsPlugin({
        cache: false,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps,
        uglifyOptions: {
          sourceMap: true,
          compress: {
            drop_console: true,
            conditionals: true,
            unused: true,
            comparisons: true,
            dead_code: true,
            if_return: true,
            join_vars: true,
            warnings: false
          },
          output: {
            comments: false
          }
        }
      }),
      //To optimize css in your code
      new OptimizeCSSAssetsPlugin({
        parser: safePostCssParser
      })
    ],
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        //To create npm module into separate file so that it can be cached unless 
        //module is changed
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            if (module.context.match(/[\\/]node_modules[\\/](react-dom|react)([\\/]|$)/)) {
              return `npm.reactBundle`;
            } else if (module.context.match(/[\\/]node_modules[\\/](react-router|react-router-dom|history|invariant|react-redux|redux|redux-*)([\\/]|$)/)) {
              return `npm.reactReduxRouterBundle`;
            } else if (module.context.match(/[\\/]node_modules[\\/](babel|webpack|core-js)([\\/]|$)/)) {
              return `npm.polyfillBundle`;
            } else {
              return `npm.otherBundle`;
            }
          }
        },
        chunks: "initial"
      },
    },
  }
};
