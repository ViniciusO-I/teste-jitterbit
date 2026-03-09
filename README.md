# API de Pedidos - Teste Técnico

API REST desenvolvida em Node.js para gerenciamento de pedidos, com persistência em MongoDB e transformação do payload recebido antes da gravação no banco.

## Tecnologias utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Nodemon

## Como executar o projeto

### 1. Instalar dependências

npm install

### 2. Configurar variáveis de ambiente

Criar arquivo `.env` na raiz do projeto com o conteúdo:

PORT=3000  
MONGO_URI=mongodb://127.0.0.1:27017/jitterbit_orders

### 3. Executar aplicação

npm run dev

A API ficará disponível em:

http://localhost:3000

## Endpoints

Criar pedido  
POST /order

Buscar pedido por número  
GET /order/:orderId

Listar pedidos  
GET /order/list

Remover pedido  
DELETE /order/:orderId

## Exemplo de payload

{
  "numeroPedido": 1001,
  "valorTotal": 450.5,
  "dataCriacao": "2026-03-09T10:00:00.000Z",
  "itens": [
    {
      "idItem": 1,
      "quantidadeItem": 2,
      "valorItem": 100.25
    }
  ]
}

## Estrutura do projeto

src/
config/
controllers/
models/
routes/
utils/
