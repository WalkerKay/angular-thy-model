const path = require('path');

module.exports = {
  entry: "./src/thy-model",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "thy-model.js",
    library: "thyModel",
    libraryTarget: "umd"
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "src")
    ],
    extensions: [".js", ".json"],
  },
  context: __dirname,
  target: "web"
};