const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "app/_widgets/widget.js"),
  mode: "production",
  output: {
    filename: "widget.bundle.js",
    path: path.resolve(__dirname, "dist"),
    library: "NotificationWidget",
    libraryTarget: "umd",
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
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};
