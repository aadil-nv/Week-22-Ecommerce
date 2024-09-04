const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Define the routes for each microservice
const serviceAProxy = createProxyMiddleware({
  target: 'http://localhost:5000',
  changeOrigin: true,
  pathRewrite: {
    '^/service-a': '', // remove /service-a from the request URL
  },
});

const serviceBProxy = createProxyMiddleware({
  target: 'http://localhost:6000',
  changeOrigin: true,
  pathRewrite: {
    '^/service-b': '', // remove /service-b from the request URL
  },
});

const serviceCProxy = createProxyMiddleware({
  target: 'http://localhost:7000',
  changeOrigin: true,
  pathRewrite: {
    '^/service-c': '', // remove /service-c from the request URL
  },
});

// Use the proxy middleware to route requests
app.use('/service-a', serviceAProxy);
app.use('/service-b', serviceBProxy);
app.use('/service-c', serviceCProxy);

app.get('/', (req, res) => {
  res.send('API Gateway is running!');
});

app.listen(PORT, () => {
  console.log(`API Gateway is running on http://localhost:${PORT}`);
});
