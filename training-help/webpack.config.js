const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const nodeExternals = require("webpack-node-externals");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssoWebpackPlugin = require("csso-webpack-plugin").default;

const config = {
  entry: {
    App: ["./start.js", "./public/javascripts/anime-app.js"]
    //App: ["./start.js", "./public/javascripts/anime-app.js"]
    //App: './public/javascripts/anime-app.js'
  },
  output: {
    path: path.resolve(__dirname, "public", "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      },
      {
        test: /\.(js)$/,
        loader: "babel-loader",
        exclude: /(node_modules)/,
        options: {
          env: ["es2015"],
          compact: true
        }
      }

      /* {
        test: /\.ejs$/,
        use: [
          {
            loader: "file-loader",
            options: {
              //name: '[path][name].[ext]' crea la carpeta views
              name: "[name].[ext]"
            }
          }
        ],
        exclude: path.resolve(__dirname, "./views/index.ejs")
      } */
    ]
  },
  target: "web", // or 'node' or 'node-webkit'
  externals: [
    nodeExternals({
      fs: "commonjs fs",
      path: "commonjs path",
      whitelist: ["jquery"]
    })
  ],
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
    dns: "empty"
  },
  resolve: {
    extensions: ["*", ".js"]
  },
  plugins: [
    new webpack.IgnorePlugin(/vertx/),
    new ExtractTextPlugin({
      filename: "app.css",
      disable: false,
      allChunks: true
    }),
    new CssoWebpackPlugin({
      comments: false
      }),
    /* new HtmlWebpackPlugin({
      filename: "index.ejs",
      template: "!!raw-loader!./views/index.ejs",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: true
      }
    }), */
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      parallel: 4,
      sourceMap: false,
      uglifyOptions: {
        ie8: false,
        output: {
          comments: false,
          beautify: false
        }
      }
    })
  ]
};
process.noDeprecation = true;

module.exports = config;
