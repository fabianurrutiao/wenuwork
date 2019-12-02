let publicPath =
  process.env.NODE_ENV === "production" ? "sing-app-vue-dashboard/" : "/";

module.exports = {
  publicPath,
  devServer: {
        proxy: 'http://localhost:3000/',
    }
};
