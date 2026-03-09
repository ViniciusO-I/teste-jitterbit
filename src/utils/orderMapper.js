function mapOrderPayload(payload) {
  const itensOriginais = Array.isArray(payload.itens) ? payload.itens : [];

  const itensConvertidos = itensOriginais.map((item) => ({
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
