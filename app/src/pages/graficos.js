import { CircularProgress, FormControl, InputLabel, MenuItem, Select, SpeedDial } from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import { Chart } from "react-google-charts";
// import { Bar } from 'react-chartjs-2';
import Grafico from '../components/pedidosGrafico';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import moment from "moment";

import React, { useEffect, useState } from 'react';
import { Box } from "@mui/system";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Logger } from "sequelize/lib/utils/logger";
const ImageLogo1 = require('../assets/fun.jpg')
const ImageAmbiente = require('../assets/ambiente.jpeg')
const ImageProd = require('../assets/produto1.png')
const getCookie = require('../utils/getCookie')


const Graficos = (props) => {
    const { logged } = props;
    const [openLoadingDialog, setOpenLoadingDialog] = useState(false)
    const [openMessageDialog, setOpenMessageDialog] = useState(false)
    const [message, setMessage] = useState('')




    const [pedidos, setPedidos] = useState([]);
    const [pedidos2, setPedidos2] = useState([]);
    const [pedidos3, setPedidos3] = useState([]);
    const [filtrados, setFiltrados] = useState([]);

    const [open, setOpen] = useState(false);
    const [mesesUnicos, setMesesUnicos] = useState([]);
    const [mesSelecionado, setMesSelecionado] = useState('');

    const dados = Array.isArray(pedidos) && pedidos.length > 0 ? pedidos[0] : [];
    const dados2 = Array.isArray(pedidos2) && pedidos2.length > 0 ? pedidos2[0] : [];
    const dados3 = Array.isArray(pedidos3) && pedidos3.length > 0 ? pedidos3[0] : [];


    useEffect(() => {
        carregarPedidos()
        carregarPedidos2()
        carregarPedidos3()




    }, [])

    useEffect(() => {
        const meses = [...new Set(dados.map(pedido => pedido.mes))];
        setMesesUnicos(meses);
        setMesSelecionado(meses[0]); // Selecionar o primeiro mês por padrão
    }, [dados, dados2, dados3]);


    // Filtrar dados com base no mês selecionado
    const dadosFiltrados = dados
  .filter(pedido => pedido.mes === mesSelecionado)
  .sort((a, b) => b.quantidade_pedidos - a.quantidade_pedidos);

  const dadosFiltrados2 = dados2
  .filter(pedido => pedido.mes === mesSelecionado)
  .sort((a, b) => b.quantidade_pedidos - a.quantidade_pedidos);

  const dadosFiltrados3 = dados3
  .filter(pedido => pedido.mes === mesSelecionado)
  .sort((a, b) => b.quantidade_pedidos - a.quantidade_pedidos);


    // Transformar os dados para o formato do Google Charts
    const data = [
        ['Produto', 'Quantidade'],
        ...dadosFiltrados.map(pedido => [pedido.nome, pedido.quantidade_pedidos]),
    ];

    const data2 = [
        ['Produto', 'Quantidade'],
        ...dadosFiltrados2.map(pedido => [pedido.nome, pedido.quantidade_pedidos]),
    ];

    const data3 = [
        ['Produto', 'Quantidade'],
        ...dadosFiltrados3.map(pedido => [pedido.nome, pedido.quantidade_pedidos]),
    ];


    const options = {
        title: `Pedidos de Produtos em ${mesSelecionado}`,
        titleTextStyle: {
          fontSize: 18,
          bold: true,
          color: '#333',
        },
        fontSize: 14,
        chartArea: {
          width: '70%',
          height: '70%',
        },
        hAxis: {
          title: 'Quantidade',
          minValue: 0,
          titleTextStyle: {
            fontSize: 16,
            bold: true,
            color: '#666',
          },
          textStyle: {
            fontSize: 9,
            color: '#444',
          },
          gridlines: {
            color: '#e0e0e0',
          },
          slantedText: true, // Permite inclinar o texto
          slantedTextAngle: 45, // Ângulo para as etiquetas
        },
        vAxis: {
          title: 'Produtos',
          titleTextStyle: {
            fontSize: 16,
            bold: true,
            color: '#666',
          },
          textStyle: {
            fontSize: 9,
            color: '#444',
          },
          gridlines: {
            color: '#e0e0e0',
          },
          textPosition: 'out', // Posiciona o texto fora do eixo
        },
        legend: {
          position: 'none',
        },
        colors: ['#FF6F61', '#6B5B95', '#88B04B', '#F7CAC9', '#92A8D1'], // Cores modernas para as barras
        bar: {
          groupWidth: '75%',
        },
        animation: {
          duration: 1000,
          easing: 'out',
        },
        annotations: {
          alwaysOutside: true,
          textStyle: {
            fontSize: 12,
            color: '#555',
            auraColor: 'none',
          },
        },
      };
      
      

    const options2 = {
        title: `Pedidos por Funcionários em ${mesSelecionado}`,
        titleTextStyle: {
          fontSize: 18,
          bold: true,
          color: '#333',
        },
        fontSize: 14,
        chartArea: {
          width: '70%',
          height: '70%',
        },
        hAxis: {
          title: 'Quantidade',
          minValue: 0,
          titleTextStyle: {
            fontSize: 16,
            bold: true,
            color: '#666',
          },
          textStyle: {
            fontSize: 12,
            color: '#444',
          },
          gridlines: {
            color: '#e0e0e0',
          },
        },
        vAxis: {
          title: 'Produtos',
          titleTextStyle: {
            fontSize: 16,
            bold: true,
            color: '#666',
          },
          textStyle: {
            fontSize: 9,
            color: '#444',
          },
          gridlines: {
            color: '#e0e0e0',
          },
        },
        legend: {
          position: 'none',
        },
        colors: ['#FF6F61', '#6B5B95', '#88B04B', '#F7CAC9', '#92A8D1'], // Cores modernas para as barras
        bar: {
          groupWidth: '75%',
        },
        animation: {
          duration: 1000,
          easing: 'out',
        },
        annotations: {
          alwaysOutside: true,
          textStyle: {
            fontSize: 12,
            color: '#555',
            auraColor: 'none',
          },
        },
      };
      
    const options3 = {
        title: `Pedidos por Ambiente em ${mesSelecionado}`,
        titleTextStyle: {
          fontSize: 18,
          bold: true,
          color: '#333',
        },
        fontSize: 14,
        chartArea: {
          width: '70%',
          height: '70%',
        },
        hAxis: {
          title: 'Quantidade',
          minValue: 0,
          titleTextStyle: {
            fontSize: 16,
            bold: true,
            color: '#666',
          },
          textStyle: {
            fontSize: 12,
            color: '#444',
          },
          gridlines: {
            color: '#e0e0e0',
          },
        },
        vAxis: {
          title: 'Produtos',
          titleTextStyle: {
            fontSize: 16,
            bold: true,
            color: '#666',
          },
          textStyle: {
            fontSize: 9,
            color: '#444',
          },
          gridlines: {
            color: '#e0e0e0',
          },
        },
        legend: {
          position: 'none',
        },
        colors: ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33A0'], // Cores modernas para as barras
        bar: {
          groupWidth: '75%',
        },
        animation: {
          duration: 1000,
          easing: 'out',
        },
        annotations: {
          alwaysOutside: true,
          textStyle: {
            fontSize: 12,
            color: '#555',
            auraColor: 'none',
          },
        },
      };
      
      

    // function gerar1(){

    //     data = {
    //         labels: nomesProdutos,
    //         datasets: [
    //           {
    //             label: 'Quantidade de Pedidos',
    //             data: quantidadesPedidos,
    //             backgroundColor: 'rgba(75, 192, 192, 0.6)',
    //             borderColor: 'rgba(75, 192, 192, 1)',
    //             borderWidth: 1,
    //           },
    //         ],
    //       };

    //        options = {
    //         scales: {
    //           y: {
    //             beginAtZero: true,
    //           },
    //         },
    //       };

    //     //   return <Bar data={data} options={options} />


    // }



    function carregarPedidos() {
        const token = getCookie('"_token_GSI"')
        const params = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        fetch(`${process.env.REACT_APP_DOMAIN_API}/api/pedido/porProduto`, params)
            .then(response => {
                const { status } = response
                response.json().then(data => {
                    if (status === 401) {
                    } else if (status === 200) {

                        // alert(JSON.stringify(data.data))

                        setPedidos(data.data)

                    }
                })
            })


    }

    function carregarPedidos2() {
        const token = getCookie('"_token_GSI"')
        const params = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        fetch(`${process.env.REACT_APP_DOMAIN_API}/api/pedido/porFuncionario`, params)
            .then(response => {
                const { status } = response
                response.json().then(data => {
                    if (status === 401) {
                    } else if (status === 200) {

                        // alert(JSON.stringify(data.data))

                        setPedidos2(data.data)

                    }
                })
            })


    }
    function carregarPedidos3() {
        const token = getCookie('"_token_GSI"')
        const params = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        fetch(`${process.env.REACT_APP_DOMAIN_API}/api/pedido/porLocal`, params)
            .then(response => {
                const { status } = response
                response.json().then(data => {
                    if (status === 401) {
                    } else if (status === 200) {

                        // alert(JSON.stringify(data.data))

                        setPedidos3(data.data)

                    }
                })
            })


    }



    return (

        <div>




            <div>
                <div >

                    <div>
                        <div>
                            <h3>Informe o mês</h3>
                         
                            <select
        style={{
          appearance: 'none',
          padding: '10px 20px',
          fontSize: '16px',
          fontFamily: 'Arial, sans-serif',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: '#fff',
          color: '#333',
          outline: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
        onChange={e => setMesSelecionado(e.target.value)}
        value={mesSelecionado}
      >
        {mesesUnicos.map((mes, index) => (
          <option
            key={index}
            value={mes}
            style={{
              padding: '10px',
              backgroundColor: '#fff',
              color: '#333',
            }}
          >
            {mes}
          </option>
        ))}
      </select>

      <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        padding: '05px',
        gap: '20px',
      }}
    >
      <div style={{ flex: '1', minWidth: '300px' }}>
        <Chart
          chartType="BarChart"
          width="100%"
          height="2200px"
          data={data}
          options={options}
        />
      </div>
      
      <div style={{ flex: '1', minWidth: '300px' }}>
        <Chart
          chartType="BarChart"
          width="100%"
          height="2200px"
          data={data2}
          options={options2}
        />
      </div>

      <div style={{ flex: '1', minWidth: '300px' }}>
        <Chart
          chartType="BarChart"
          width="100%"
          height="2200px"
          data={data3}
          options={options3}
        />
      </div>
    </div>
                        </div>
                    </div>
                    {/* <div>
            
                        {pedidos && pedidos.length?
                         <div>
                         <h2>Gráfico dor produto</h2>
                         <Grafico pedidos={pedidos} />
                       </div>
                        
                        
                        :   ''}
                    </div> */}

                    {/* <div>
                        <h2>Gráfico de Funcionario</h2>
                        {pedidos2.length?
                         <div>
                         
                         <Grafico pedidos={pedidos2} />
                       </div>
                        
                        
                        :   ''}
                    </div>

                    <div>
                        <h2>Gráfico de Local</h2>
                        {pedidos3.length?
                         <div>
                         
                         <Grafico pedidos={pedidos3} />
                       </div>
                        
                        
                        :   ''}
                    </div> */}







                </div>
            </div>






            {/* <Dialog >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 120, height: 120 }}>
                    <CircularProgress />
                </div>
            </Dialog> */}













        </div>
    );
};

export default Graficos;
