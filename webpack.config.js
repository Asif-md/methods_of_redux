const path = require("path"),
  webpack = require("webpack"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  PATHS = {
    app: path.join(__dirname, "app"),
    components: path.join(__dirname, "app/components"),
    images: path.join(__dirname, "app/images"),
    css: path.join(__dirname, "app/css"),
    apis: path.join(__dirname, "app/apis"),
    actions: path.join(__dirname, "app/actions"),
    utils: path.join(__dirname, "app/utils"),
    reducers: path.join(__dirname, "app/reducers"),
    routes: path.join(__dirname, "app/routes.js"),
    stateToProps: path.join(__dirname, "app/stateToProps"),
    preFilledTemplates: path.join(__dirname, "app/preFilledTemplates"),
    build: path.join(__dirname, "public"),
    buildJs: "js",
    buildImages: "images",
    buildFonts: "fonts",
    buildCss: "css"
  };

module.exports = {
  mode: "development",
  // Entry accepts a path or an object of entries.
  // We'll be using the latter form given it's
  // convenient with more complex configurations.
  entry: {
    app: [PATHS.app]
  },
  output: {
    path: PATHS.build,
    publicPath: "/",
    filename: `${PATHS.buildJs}/[name].js`,
    chunkFilename: `${PATHS.buildJs}/[name].[contenthash:5].js`
  },
  resolve: {
    modules: ["src", "node_modules"],
    extensions: ["*", ".js", ".jsx", ".css", ".scss"],
    alias: {
      components: PATHS.components,
      css: PATHS.css,
      images: PATHS.images,
      apis: PATHS.apis,
      actions: PATHS.actions,
      utils: PATHS.utils,
      routes: PATHS.routes,
      reducers: PATHS.reducers,
      stateToProps: PATHS.stateToProps,
      preFilledTemplates: PATHS.preFilledTemplates
    }
  },
  devServer: {
    historyApiFallback: true
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: PATHS.buildImages
            }
          }
        ]
      },
      {
        test: /\.(woff2|ttf|woff|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: PATHS.buildFonts
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    }),
    new HtmlWebpackPlugin({
      title: "PhonePe Valhalla",
      inject: true,
      template: path.join(PATHS.app, "index.html"),
      chunksSortMode: "none"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: `${PATHS.buildCss}/[name].[contenthash:5].css`,
      chunkFilename: `${PATHS.buildCss}/[name].[id].[contenthash:5].css`
    })
  ],
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
    dgram: "empty",
    child_process: "empty"
  }
};
