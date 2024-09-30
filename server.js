const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

// Middleware para o corpo da requisição
app.use(express.json());

// Rota GET simples
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

// Rota POST simples
app.post('/api/data', (req, res) => {
    const { name } = req.body;
    res.json({ message: `Hello, ${name}!` });
});

// Middleware de proxy
app.use('/api/proxy', createProxyMiddleware({
    target: 'https://jsonplaceholder.typicode.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api/proxy': '', // Remove '/api/proxy' da URL de destino
    },
}));

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
