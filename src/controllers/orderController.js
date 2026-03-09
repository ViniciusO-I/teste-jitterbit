const Order = require('../models/Order');
const { mapOrderPayload } = require('../utils/orderMapper');

async function createOrder(req, res) {
  try {
    const pedidoConvertido = mapOrderPayload(req.body);

    const pedidoExistente = await Order.findOne({ orderId: pedidoConvertido.orderId });

    if (pedidoExistente) {
      return res.status(409).json({
        message: 'Já existe um pedido com esse número.'
      });
    }

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
    const pedidos = await Order.find().sort({ orderId: 1 });

    return res.status(200).json(pedidos);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao listar pedidos.',
      error: error.message
    });
  }
}

module.exports = {
  createOrder,
  getOrderById,
  listOrders
};