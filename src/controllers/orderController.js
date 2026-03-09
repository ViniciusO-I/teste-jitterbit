const Order = require('../models/Order');
const { mapOrderPayload } = require('../utils/orderMapper');

/**
 * Controller responsável pelas operações relacionadas a pedidos.
 * Contém regras básicas de criação, consulta e listagem.
 */

async function createOrder(req, res) {
  try {
    const { numeroPedido, valorTotal, dataCriacao, itens } = req.body;

    // Validação simples do payload recebido
    if (!numeroPedido || !valorTotal || !dataCriacao || !Array.isArray(itens)) {
      return res.status(400).json({
        message: 'Dados obrigatórios do pedido não foram informados corretamente.'
      });
    }

    // Converte os campos do payload para o formato interno da aplicação
    const pedidoConvertido = mapOrderPayload(req.body);

    // Evita duplicidade de pedidos com o mesmo número
    const pedidoExistente = await Order.findOne({
      orderId: pedidoConvertido.orderId
    });

    if (pedidoExistente) {
      return res.status(409).json({
        message: 'Já existe um pedido com esse número.'
      });
    }

    // Persiste o pedido no MongoDB
    const novoPedido = await Order.create(pedidoConvertido);

    return res.status(201).json(novoPedido);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao criar pedido.',
      error: error.message
    });
  }
}

async function getOrderById(req, res) {
  try {
    const { orderId } = req.params;

    const pedido = await Order.findOne({ orderId: Number(orderId) });

    if (!pedido) {
      return res.status(404).json({
        message: 'Pedido não encontrado.'
      });
    }

    return res.status(200).json(pedido);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao buscar pedido.',
      error: error.message
    });
  }
}

async function listOrders(req, res) {
  try {
    // Lista todos os pedidos ordenados pelo número
    const pedidos = await Order.find().sort({ orderId: 1 });

    return res.status(200).json(pedidos);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao listar pedidos.',
      error: error.message
    });
  }
}

async function deleteOrder(req, res) {
  try {
    const { orderId } = req.params;

    const pedidoRemovido = await Order.findOneAndDelete({
      orderId: Number(orderId)
    });

    if (!pedidoRemovido) {
      return res.status(404).json({
        message: 'Pedido não encontrado para exclusão.'
      });
    }

    return res.status(200).json({
      message: 'Pedido removido com sucesso.'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao remover pedido.',
      error: error.message
    });
  }
}

module.exports = {
  createOrder,
  getOrderById,
  listOrders,
  deleteOrder
};