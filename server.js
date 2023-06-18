const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// Função de callback para tratar as requisições
const requestHandler = (request, response) => {
  let filePath = '.' + request.url;

  if (filePath === './home') {
    filePath = './index.html';
  }

  if (filePath === './cadastro') {
    filePath = './login_cadastro.html';
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
  };

  const contentTypeHeader = contentType[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        response.writeHead(404);
        response.end('Arquivo não encontrado');
      } else {
        response.writeHead(500);
        response.end('Erro interno do servidor');
      }
    } else {
      response.writeHead(200, { 'Content-Type': contentTypeHeader });
      response.end(content, 'utf-8');
    }
  });
};

// Criação do servidor
const server = http.createServer(requestHandler);

// Define a porta em que o servidor vai escutar
const port = 16000;

// Inicia o servidor
server.listen(port, (error) => {
  if (error) {
    console.log('Ocorreu um erro:', error);
  } else {
    console.log(`Servidor está rodando em http://localhost:${port}`);
  }
});
