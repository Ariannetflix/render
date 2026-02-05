const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', createProxyMiddleware({
    target: 'https://dir.cubernets.com',
    changeOrigin: true,
    ws: true, // Support for WebSockets (essential for some VPN protocols)
    logLevel: 'debug',
    onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));

app.listen(PORT, () => {
    console.log(`Proxy running on port ${PORT}`);
});
