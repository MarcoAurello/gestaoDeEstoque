import { CircularProgress, FormControl, InputLabel, MenuItem, Select, SpeedDial } from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import { Chart } from "react-google-charts";


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

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [caminho, setCaminho] = useState('');
    const [produtos, setProdutos] = useState([]);
    const [unidades, setUnidades] = useState([]);
    const [produtosA, setProdutosA] = useState([]);

    const [solicitar, setSolicitar] = useState(false)
    const [fkUnidade, setFkUnidade] = useState('');
    const [setores, setSetores] = useState([]);
    const [minhas, setMinhas] = useState([]);
    const [localRelatorio, setLocalRelatorio] = useState('');



    const [chamado, setChamado] = useState(null);

    const [fkUsuario, setFkUsuario] = useState(null);
    const [fkUsuarioPesquisa, setFkUsuarioPesquisa] = useState(null);
    const [fkCham, setFkCham] = useState(null);
    const [executor, setExecutor] = useState('');
    const [obsDemandante, setObsDemandante] = useState('');
    const [criticidadeChefe, setCriticidade] = useState(null)
    const [fkLocal, setFkLocal] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [fkProduto, setFkProduto] = useState('');
    const [fkFuncionaio, setFkFuncionario] = useState('');
    const [nomeProduto, setNomeProduto] = useState('');
    const [modalMeus, setModalMeus] = useState(false);
    const [relatorioDoLocal, setRelatorioDoLocal] = useState([]);
    const [abrirProduto, setAbrirProduto] = useState(false);
    const [abrirEstoque, setAbrirEstoque] = useState(false);
    const [abrirAmbiente, setAbrirAmbiente] = useState(false);
    const [abrirNovoProduto, setAbrirNovoProduto] = useState(false);
    const [modalRelatorioLocal, setModalRelatorioLocal] = useState(false);

    const [pesquisa, setPesquisa] = useState('');
    const [nomeAmbiente, setNomeAmbiente] = useState('');
    const [pedidosDoFuncionario, setPedidosDoFuncionario] = useState([]);
    const [funcionarios, setFuncionarios] = useState([]);
    const [relatorioProdutos, setRelatorioProdutos] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [modalRelatorioFuncionario, setModalRelatorioFuncionario] = useState(false);
    const [dataInicio, setDataInicio] = useState(null);
    const [dataFim, setDataFim] = useState(null);
    const [open, setOpen] = useState(false);



    useEffect(() => {
        carregarPedidos()

        if (pedidos) {
        
        }
    }, [])



    function carregarPedidos() {
        const token = getCookie('"_token_GSI"')
        const params = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        fetch(`${process.env.REACT_APP_DOMAIN_API}/api/pedido/`, params)
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













    const handleDataChangeNF = (event) => {

        const selectedDate = event.target.value;
        const currentDate = new Date();
        const [year, month, day] = selectedDate.split('-');
        const newDate = new Date(year, month - 1, day, currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());
        setDataInicio(newDate.toISOString());
    };
    const handleDataChangeNF1 = (event) => {

        const selectedDate = event.target.value;
        const currentDate = new Date();
        const [year, month, day] = selectedDate.split('-');
        const newDate = new Date(year, month - 1, day, currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());
        setDataFim(newDate.toISOString());
    };


    const obterProdutosUnicos = (pedidos) => {
        const produtosUnicos = [];
        pedidos.forEach((pedido) => {
            if (!produtosUnicos.includes(pedido.Produto.nome)) {
                produtosUnicos.push(pedido.Produto.nome);
            }
        });
        return produtosUnicos;
    };

    const obterUsuarioUnicos = (pedidos) => {
        const usuariosUnicos = [];
        pedidos.forEach((pedido) => {
            if (!usuariosUnicos.includes(pedido.Usuario.nome)) {
                usuariosUnicos.push(pedido.Usuario.nome);
            }
        });
        return usuariosUnicos;
    };

    const obterLocalUnicos = (pedidos) => {
        const localUnico = [];
        pedidos.forEach((pedido) => {
            if (!localUnico.includes(pedido.Local.nome)) {
                localUnico.push(pedido.Local.nome);
            }
        });
        return localUnico;
    };

    const prod = obterProdutosUnicos(pedidos);
    const user = obterUsuarioUnicos(pedidos);
    const loc = obterLocalUnicos(pedidos);



    


    const data3 = [
        ["Local", "Quantidade", { role: 'style' }, { role: 'annotation' }],
        ...loc.map((local, index) => {
            const quantidade = pedidos.reduce((contador, item) => contador + (item.Local.nome === local && item.status === 'Entregue' ? 1 : 0), 0);
            return [
                local,
                quantidade,
                `color: ${getColor(index)}`, // Chamada para a função getColor para cores diferentes
                quantidade.toString()
            ];
        })
    ];


    const data = [
        ["Produto", "Quantidade", { role: 'style' }, { role: 'annotation' }],
        ...prod.map((produto, index) => {
            const quantidade = pedidos.reduce((contador, item) => contador + (item.Produto.nome === produto && item.status === 'Entregue' ? 1 : 0), 0);
            return [
                produto,
                quantidade,
                `color: ${getColor(index)}`, // Chamada para a função getColor para cores diferentes
                quantidade.toString()
            ];
        })
    ];

    const data1 = [
        ["Usuario", "Quantidade", { role: 'style' }, { role: 'annotation' }],
        ...user.map((usuario, index) => {
            const quantidade = pedidos.reduce((contador, item) => contador + (item.Usuario.nome === usuario && item.status === 'Entregue' ? 1 : 0), 0);
            return [
                usuario,
                quantidade,
                `color: ${getColor(index)}`, // Chamada para a função getColor para cores diferentes
                quantidade.toString()
            ];
        })
    ];



    function getColor(index) {
        const colors = [
            '#3366cc', '#dc3912', '#ff9900', '#109618', '#990099', '#0099c6', '#dd4477', '#66aa00', '#b82e2e', '#316395',
            '#994499', '#22aa99', '#aaaa11', '#6633cc', '#e67300', '#8b0707', '#651067', '#329262', '#5574a6', '#3b3eac',
            // Adicione mais cores conforme necessário
        ];
        return colors[index % colors.length];
    }

    const options = {
        title: 'Distribuição de Produtos',
        fontSize: 12,
        chartArea: { width: '50%' },
        hAxis: {
            title: 'Quantidade',
            minValue: 0,
        },
        vAxis: {
            title: 'Produto',
        },
        legend: { position: 'none' },
    };

    const options1 = {
        title: 'Distribuição dos Funcionarios',
        fontSize: 12,
        chartArea: { width: '50%' },
        hAxis: {
            title: 'Quantidade',
            minValue: 0,
        },
        vAxis: {
            title: 'Usuario',
        },
        legend: { position: 'none' },
    };

    const options3 = {
        title: 'Distribuição dos Locais',
        fontSize: 12,
        chartArea: { width: '50%' },
        hAxis: {
            title: 'Quantidade',
            minValue: 0,
        },
        vAxis: {
            title: 'Local',
        },
        legend: { position: 'none' },
    };








    return (

        <div>




            <div>
                <div >

                    <Chart
                        chartType="BarChart"
                        width="100%"
                        height="1500px"
                        data={data}
                        options={options}
                    />

                    <Chart
                        chartType="BarChart"
                        width="100%"
                        height="1500px"
                        data={data1}
                        options={options1}
                    />

                    <Chart
                        chartType="BarChart"
                        width="100%"
                        height="1500px"
                        data={data3}
                        options={options3}
                    />






                    {/* {pedidos ?
                        <div>
                            {pedidos.map((item, index) => <u key={index}>{item.Produto.nome}</u>)}

                        </div> : ''} */}








                </div>
            </div>






            <Dialog >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 120, height: 120 }}>
                    <CircularProgress />
                </div>
            </Dialog>













        </div>
    );
};

export default Graficos;
