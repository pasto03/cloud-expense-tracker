const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api/auth',
        createProxyMiddleware({
            target: `${process.env.REACT_APP_SERVER_URL}/api/auth`,
            changeOrigin: true,
        })
    );
    app.use(
        '/api/users',
        createProxyMiddleware({
            target: `${process.env.REACT_APP_SERVER_URL}/api/users`,
            changeOrigin: true,
        })
    );
};