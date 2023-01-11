/* eslint-disable */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.tsx"
  },
  
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name]-[hash].js",
  },
  devtool: "source-map",
  devServer: {
    port: "3000",
    static: {
      directory: path.join(__dirname, "public")
    },
    hot: true,
    liveReload: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, 
        exclude: /node_modules/, 
        use: "babel-loader", 
      },
      {
        test: /\.(ts|tsx)$/, 
        exclude: /node_modules/, 
        use: "ts-loader", 
      },
      {
        test: /\.(s[ac]ss)$/, 
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html")
    })
  ]
};