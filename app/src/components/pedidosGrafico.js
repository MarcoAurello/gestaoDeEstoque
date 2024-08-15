import React from 'react';
import { Chart } from 'react-google-charts';
const PedidosGrafico = ({ pedidos }) => {
  // Verificar se pedidos é um array com um nível adicional e extrair o primeiro item
  const dados = Array.isArray(pedidos) && pedidos.length > 0 ? pedidos[0] : [];

  // Transformar dados para o formato do Google Charts
  const data = [
    ['Produto','Quantidade'],
    ...dados.map(pedido => [pedido.nome, pedido.quantidade_pedidos]),
  ];
  const options = {
    title: 'Distribuição',
    fontSize: 12,
    chartArea: { width: '80%' },
    hAxis: {
        title: 'Quantidade',
        minValue: 0,
    },
    vAxis: {
        title: 'Pedidos',
    },
    legend: { position: 'none' },
};
  return (
    <div>
     <Chart
                                chartType="BarChart"
                                width="100%"
                                height="1500px"
                                data={data}
                                options={options}
                            />
    </div>
  );
};
export default PedidosGrafico;
