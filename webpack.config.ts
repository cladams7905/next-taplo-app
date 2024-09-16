import path from "path";
import webpack from "webpack";
import { getURL } from "./lib/actions/index";

const webpackConfig = {
  entry: path.resolve("app/_widgets/widget.js"),
  mode: "production",
  output: {
    filename: "widget.bundle.js",
    path: path.resolve("public/scripts"),
    library: "NotificationWidget",
    libraryTarget: "umd",
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env", // Transpiles modern JavaScript
              "@babel/preset-react", // Transpiles JSX
              "@babel/preset-typescript", // Transpiles TypeScript
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      site_url: JSON.stringify(getURL()),
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve("."),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};

export default webpackConfig;
