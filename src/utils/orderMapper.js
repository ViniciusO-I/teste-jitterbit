// Responsável por adaptar o payload recebido para o formato interno da aplicação

function mapOrderPayload(payload) {
  const itensConvertidos = (payload.itens || []).map((item) => ({
    productId: item.idItem,
    quantity: item.quantidadeItem,
    price: item.valorItem
  }));

  return {
    orderId: payload.numeroPedido,
    value: payload.valorTotal,
    creationDate: payload.dataCriacao,
    items: itensConvertidos
  };
}

module.exports = {
  mapOrderPayload
};