import { CircularProgress, FormControl, InputLabel, MenuItem, Select, SpeedDial } from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';


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


const Relatorio = (props) => {
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
    const [todasDoFuncionario, setTodasDoFuncionario] = useState([]);
    const [modalRelatorioFuncionario, setModalRelatorioFuncionario] = useState(false);
    const [dataInicio, setDataInicio] = useState(null);
    const [dataFim, setDataFim] = useState(null);
  







    const [open, setOpen] = useState(false);


    function carregarSetor() {

        // setOpenLoadingDialog(true)
        const token = getCookie("_token_GSI");
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        fetch(
            `${process.env.REACT_APP_DOMAIN_API}/api/local/`,
            params
        ).then((response) => {
            const { status } = response;
            response
                .json()
                .then((data) => {
                    setOpenLoadingDialog(false);
                    if (status === 401) {
                    } else if (status === 200) {
                        setSetores(data.data);
                        setOpenLoadingDialog(false);
                    }
                })
                .catch((err) => setOpenLoadingDialog(true));
        });
    }

    function carregarRelatorioFuncionario(id, local) {
        setLocalRelatorio(local)
    
    
        // setOpenLoadingDialog(true)
        const token = getCookie("_token_GSI");
        const params = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        fetch(
          `${process.env.REACT_APP_DOMAIN_API}/api/usuario/searchRelatorio?pesquisa=${id}`,
          params
        ).then((response) => {
          const { status } = response;
          response
            .json()
            .then((data) => {
              setOpenLoadingDialog(false);
              if (status === 401) {
              } else if (status === 200) {
                setRelatorioDoLocal(data.data);
                setOpenLoadingDialog(false);
                setModalRelatorioLocal(true)
              }
            })
            .catch((err) => setOpenLoadingDialog(true));
        });
      }
    


 

   


    



    function carregarProdutos() {

        const token = getCookie("_token_GSI")
        const params = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        fetch(`${process.env.REACT_APP_DOMAIN_API}/api/produto/`, params)
            .then(response => {

                const { status } = response

                response.json().then(data => {

                    if (status === 401) {
                    } else if (status === 200) {
                        setProdutos(data.data)

                    }
                })
            })
    }

    function carregarFuncionarios() {

        const token = getCookie("_token_GSI")
        const params = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        fetch(`${process.env.REACT_APP_DOMAIN_API}/api/usuario/`, params)
            .then(response => {

                const { status } = response

                response.json().then(data => {

                    if (status === 401) {
                    } else if (status === 200) {
                        setFuncionarios(data.data)

                    }
                })
            })
    }




    function carregarUnidades() {

        const token = getCookie("_token_GSI")
        const params = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        fetch(`${process.env.REACT_APP_DOMAIN_API}/api/unidade/`, params)
            .then(response => {

                const { status } = response

                response.json().then(data => {

                    if (status === 401) {
                    } else if (status === 200) {
                        setUnidades(data.data)

                    }
                })
            })
    }






    useEffect(() => {

        carregarProdutos()
        carregarUnidades()
        carregarFuncionarios()


        carregarSetor()


        if (logged) {
            setFkUsuario(logged.id)
            // alert(logged.Perfil.nome)

        }

        // if (pesquisa) {
        //     pesquisar()
        // }




        // if(funcionarios){
        //   alert(JSON.stringify(funcionarios))
        // }

    }, [fkUnidade, fkUnidade, logged, pesquisa, dataInicio,dataFim])

    function pesquisar() {
        const token = getCookie("_token_GSI");
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        // fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade${pesquisa?`/search?&pesquisa=${pesquisa}` : ''
        fetch(
            `${process.env.REACT_APP_DOMAIN_API}/api/pedido/search?pesquisa=${pesquisa}`,
            params
        ).then((response) => {
            const { status } = response;
            response
                .json()
                .then((data) => {
                    // setOpenLoadingDialog(false)

                    if (status === 401) {
                        // alert(status)
                    } else if (status === 200) {
                        // alert(pesquisa)
                        // alert(JSON.stringify(data.data))
                        setPedidosDoFuncionario(data.data);
                        // alert(JSON.stringify(respostas))
                        // filtrarUsuariosDemandados()
                    }
                })
                .catch((err) => console.log(err));
        });
    }



    //  
    const funcao = (id, nome) => {
        setNomeProduto(nome)
        setFkProduto(id); // Defina o fkProduto com o id do item
        setSolicitar(true); // Abra o modal
    };

    useEffect(() => {

        function carregarMinhas() {

            const token = getCookie("_token_GSI");
            const params = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            fetch(
                `${process.env.REACT_APP_DOMAIN_API}/api/pedido/${fkUsuario}`,
                params
            ).then((response) => {
                const { status } = response;
                response
                    .json()
                    .then((data) => {
                        setOpenLoadingDialog(false);
                        if (status === 401) {
                        } else if (status === 200) {
                            setMinhas(data.data);
                            setOpenLoadingDialog(false);
                        }
                    })
                    .catch((err) => setOpenLoadingDialog(true));
            });
        }

        carregarMinhas()

    }, [fkUsuario])




    const handleInputChange = (event) => {
        const value = event.target.value;
        // Verificar se o valor é numérico antes de atualizar o estado
        if (!isNaN(value)) {
            setQuantidade(value);
        }
    };

    const handleInputChange1 = (event) => {
        const value = event.target.value;
        // Verificar se o valor é numérico antes de atualizar o estado

        setNomeAmbiente(value);

    };


    function porFuncionario() {


        // setOpenLoadingDialog(true)
        const token = getCookie("_token_GSI");
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        fetch(
            `${process.env.REACT_APP_DOMAIN_API}/api/usuario/search?pesquisa=${fkUsuarioPesquisa}&dataInicio=${dataInicio}&dataFim=${dataFim}`,
            params
        ).then((response) => {
            const { status } = response;
            response
                .json()
                .then((data) => {
                    setOpenLoadingDialog(false);
                    if (status === 401) {
                    } else if (status === 200) {
                        setTodasDoFuncionario(data.data);
                        setOpenLoadingDialog(false);
                        setAbrirEstoque(false)
                        setModalRelatorioFuncionario(true)
                    }
                })
                .catch((err) => setOpenLoadingDialog(true));
        });
    }

    function porProduto() {


        // setOpenLoadingDialog(true)
        const token = getCookie("_token_GSI");
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        fetch(
            `${process.env.REACT_APP_DOMAIN_API}/api/produto/search?pesquisa=${fkProduto}&dataInicio=${dataInicio}&dataFim=${dataFim}`,
            params
        ).then((response) => {
            const { status } = response;
            response
                .json()
                .then((data) => {
                    setOpenLoadingDialog(false);
                    if (status === 401) {
                    } else if (status === 200) {
                        setTodasDoFuncionario(data.data);
                        setOpenLoadingDialog(false);
                        setAbrirNovoProduto(false)
                        setModalRelatorioFuncionario(true)
                    }
                })
                .catch((err) => setOpenLoadingDialog(true));
        });
    }



    function porLocal() {
        // alert(fkLocal)


        // setOpenLoadingDialog(true)
        const token = getCookie("_token_GSI");
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        fetch(
            `${process.env.REACT_APP_DOMAIN_API}/api/local/searchPorLocal?pesquisa=${fkLocal}&dataInicio=${dataInicio}&dataFim=${dataFim}`,
            params
        ).then((response) => {
            const { status } = response;
            response
                .json()
                .then((data) => {
                    setOpenLoadingDialog(false);
                    if (status === 401) {
                    } else if (status === 200) {
                        setTodasDoFuncionario(data.data);
                        setOpenLoadingDialog(false);
                        setAbrirNovoProduto(false)
                        setModalRelatorioFuncionario(true)
                    }
                })
                .catch((err) => setOpenLoadingDialog(true));
        });
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








    return (

        <div>
            <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                type="text/css"
                rel="stylesheet"
            />
            <link
                rel="stylesheet"
                href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                crossorigin="anonymous"
            />



            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh', // Torna a div centralizada na vertical
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row', // Por padrão, mostra em linha
                    flexWrap: 'wrap', // Permite que os itens se movam para uma nova linha conforme necessário
                    justifyContent: 'center',
                }}>

                    {logged && logged.Perfil && logged.Perfil.nome === 'Administrador' ?
                       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                       <a style={{ textDecoration: 'none', display: 'inline-block' }}>
                           <div
                               style={{
                                   width: '220px',
                                   height: '250px',
                                   textAlign: 'center',
                                   padding: '10px',
                                   border: '2px solid #ccc',
                                   borderRadius: '12px',
                                   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                   cursor: 'pointer',
                               }}
                           >
                               <b>Relatório por Funcionário</b><br />
                               <img
                                   src={ImageLogo1}
                                   style={{ width: '180px', borderRadius: '8px' }}
                                   onClick={() => setAbrirEstoque(true)}
                               />
                           </div>
                       </a>
                   
                       <a style={{ textDecoration: 'none', display: 'inline-block' }}>
                           <div
                               style={{
                                   width: '220px',
                                   height: '250px',
                                   textAlign: 'center',
                                   padding: '10px',
                                   border: '2px solid #ccc',
                                   borderRadius: '12px',
                                   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                   cursor: 'pointer',
                               }}
                           >
                               <b>Relatório por produto</b><br />
                               <img src={ImageProd} style={{ width: '200px' }} onClick={() => setAbrirNovoProduto(true)} />
                           </div>
                       </a>
                   </div>
                   
                        : ''
                    }


                    <a style={{ textDecoration: 'none', display: 'inline-block' }}>
                        <div
                            style={{
                                width: '220px', // Definindo largura fixa
                                height: '250px', // Definindo altura fixa
                                textAlign: 'center',
                                padding: '10px', // Adiciona um espaço interno para a borda
                                border: '2px solid #ccc', // Aumenta a largura da borda
                                borderRadius: '12px', // Bordas arredondadas
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Sombra moderada
                                cursor: 'pointer', // Altera o cursor ao passar o mouse
                            }}
                        >
                            <b >Relatório por Ambiente</b><br />
                            <img src={ImageAmbiente} style={{ width: '200px' }}
                                onClick={() => setAbrirAmbiente(true)} />

                        </div>


                    </a>

                    {logged && logged.Perfil && logged.Perfil.nome === 'Usuario' ?

                        <a style={{ textDecoration: 'none', display: 'inline-block' }}>
                            <div
                                style={{
                                    width: '220px', // Definindo largura fixa
                                    height: '250px', // Definindo altura fixa
                                    textAlign: 'center',
                                    padding: '10px', // Adiciona um espaço interno para a borda
                                    border: '2px solid #ccc', // Aumenta a largura da borda
                                    borderRadius: '12px', // Bordas arredondadas
                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Sombra moderada
                                    cursor: 'pointer', // Altera o cursor ao passar o mouse
                                }}
                            >
                                <b >Seus Pedidos</b><br />
                                <img src={ImageLogo1}  style={{ width: '180px', borderRadius: '8px' }}
                                    onClick={() => carregarRelatorioFuncionario(logged.id, logged.nome)} />

                            </div>


                        </a>



                        : ''}






                </div>
            </div>






            <Dialog >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 120, height: 120 }}>
                    <CircularProgress />
                </div>
            </Dialog>


            <Dialog
                open={abrirEstoque}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <b style={{ marginLeft: '10px' }} >Selecione o funcionário
                </b>
                <DialogContent style={{ width: 400 }}>

                    <FormControl fullWidth>
                        <InputLabel htmlFor="demo-select-small">Nome</InputLabel>
                        <Select
                            size="small"
                            fullWidth
                            labelId="demo-select-small"
                            id="demo-select-small"
                            label="Funcionario"
                            value={fkUsuarioPesquisa}

                        >

                            {funcionarios.map((item, index) => <MenuItem key={index} value={item.id} onClick={() => setFkUsuarioPesquisa(item.id)}>{item.nome}</MenuItem>)}
                        </Select>
                        <p></p>
                    </FormControl><p></p>

                    <TextField
                        id="date"
                        label="Data Inicial"
                        type="date"
                        size="small"
                        style={{ marginRight: '5px' }}
                        defaultValue={new Date()}
                        onChange={handleDataChangeNF}

                        InputLabelProps={{
                            shrink: true,
                        }}
                    /><p></p>
                    <TextField
                        id="date"
                        label="Data Final"
                        type="date"
                        size="small"
                        style={{ marginRight: '5px' }}
                        defaultValue={new Date()}
                        onChange={handleDataChangeNF1}

                        InputLabelProps={{
                            shrink: true,
                        }}
                        />

                    {/* <FormControl fullWidth size="small">
                        <TextField
                            fullWidth
                            variant="outlined"
                            label='Quantidade'
                            value={quantidade}
                            onChange={handleInputChange}
                        />
                    </FormControl> */}




                </DialogContent>

                {fkUsuarioPesquisa ?

                    <Button onClick={() => porFuncionario()}>Buscar</Button>

                    : ""}
                <DialogActions >

                    <Button  style={{ color:'red'}} onClick={() => setAbrirEstoque(false)}>
                        sair
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={abrirNovoProduto}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <b style={{ marginLeft: '10px' }} >Relatorio por Produto
                </b>
                <DialogContent style={{ width: 400 }}>

                    <FormControl fullWidth>
                        <InputLabel htmlFor="demo-select-small">Produto</InputLabel>
                        <Select
                            size="small"
                            fullWidth
                            labelId="demo-select-small"
                            id="demo-select-small"
                            label="Produto"
                            value={fkProduto}

                        >

                            {produtos.map((item, index) => <MenuItem key={index} value={item.id} onClick={() => setFkProduto(item.id)}>{item.nome}</MenuItem>)}
                        </Select>
                        <p></p>
                    </FormControl><p></p>
                    <TextField
                        id="date"
                        label="Data Inicial"
                        type="date"
                        size="small"
                        style={{ marginRight: '5px' }}
                        defaultValue={new Date()}
                        onChange={handleDataChangeNF}

                        InputLabelProps={{
                            shrink: true,
                        }}
                    /><p></p>
                    <TextField
                        id="date"
                        label="Data Final"
                        type="date"
                        size="small"
                        style={{ marginRight: '5px' }}
                        defaultValue={new Date()}
                        onChange={handleDataChangeNF1}

                        InputLabelProps={{
                            shrink: true,
                        }}
                        />






                </DialogContent>

                {fkProduto  && dataInicio && dataFim?

                    <Button onClick={() => porProduto()}>Buscar</Button>

                    : ""}
                <DialogActions >

                    <Button style={{ color:'red'}} onClick={() => setAbrirNovoProduto(false)}>
                        sair
                    </Button>
                </DialogActions>
            </Dialog>



            <Dialog
                open={abrirAmbiente}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <b style={{ marginLeft: '10px' }} >Relatório por Ambiênte
                </b>
                <DialogContent style={{ width: 400 }}>


                    <FormControl fullWidth>
                        <InputLabel htmlFor="demo-select-small">Selecione o ambiente</InputLabel>
                        <Select
                            size="small"
                            fullWidth
                            labelId="demo-select-small"
                            id="demo-select-small"
                            label="Local"
                            value={fkLocal}

                        >

                            {setores.map((item, index) => <MenuItem key={index} value={item.id} onClick={() => setFkLocal(item.id)}>{item.nome}</MenuItem>)}
                        </Select>
                        <p></p>
                    </FormControl><p></p>

                    <TextField
                        id="date"
                        label="Data Inicial"
                        type="date"
                        size="small"
                        style={{ marginRight: '5px' }}
                        defaultValue={new Date()}
                        onChange={handleDataChangeNF}

                        InputLabelProps={{
                            shrink: true,
                        }}
                    /><p></p>
                    <TextField
                        id="date"
                        label="Data Final"
                        type="date"
                        size="small"
                        style={{ marginRight: '5px' }}
                        defaultValue={new Date()}
                        onChange={handleDataChangeNF1}

                        InputLabelProps={{
                            shrink: true,
                        }}
                        />




                </DialogContent>

                {fkLocal && dataInicio && dataFim ?

                    <Button onClick={() => porLocal()}>Buscar</Button>

                    : ""}
                <DialogActions >

                    <Button style={{ color:'red'}}  onClick={() => setAbrirAmbiente(false)}>
                        sair
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={modalRelatorioFuncionario}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    Relatório de {moment(dataInicio).format("DD-MM-YYYY")} a {moment(dataFim).format("DD-MM-YYYY")}
                </DialogTitle>
                <DialogContent style={{ width: '100%', maxWidth: 900, overflowX: 'auto' }}>
                    {todasDoFuncionario ? (
                        <div style={{ overflowX: 'auto' }}>
                            <table
                                className="table table-striped"
                                style={{
                                    fontFamily: "Arial, sans-serif",
                                    fontSize: "12px",
                                    width: "100%",
                                    borderCollapse: "collapse",
                                    border: "1px solid #ddd",
                                }}
                            >
                                <thead>
                                    <tr style={{ wordBreak: "break-all", fontSize: '12px', backgroundColor: '#bbbbbb' }}>

                                        <th>Usuário</th>
                                        <th>Produto</th>
                                        <th>Local</th>
                                        <th>Quantidade</th>
                                        <th>Status</th>
                                        <th>Retirado</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {todasDoFuncionario.map((item, index) => (
                                        <tr key={index}>

                                            <td>{item.Usuario ? item.Usuario.nome : ''}</td>
                                            <td>{item.Produto ? item.Produto.nome : ''}</td>
                                            <td>{item.Local ? item.Local.nome : ''}</td>
                                            <td>{item.quantidadeRetirada}</td>
                                            <td>{item.status}</td>
                                            {item.dataRetirada === null ? <td></td> :
                                                <td>{moment(item.dataRetirada).format("DD-MM-YYYY")}</td>
                                            }

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button onClick={() => window.print()}>Imprimir PDF</button>
                        </div>
                    ) : (
                        ""
                    )}
                    <DialogActions>
                        <Button style={{ color:'red'}} onClick={() => setModalRelatorioFuncionario(false)}>
                            sair
                        </Button>
                    </DialogActions>
                </DialogContent>

            </Dialog>

            <Dialog
        open={modalRelatorioLocal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          Pedidos para {localRelatorio}
        </DialogTitle>
        <DialogContent style={{ width: '100%', maxWidth: 600, overflowX: 'auto' }}>
          {relatorioDoLocal ? (
            <div style={{ overflowX: 'auto' }}>
              <table
                className="table table-striped"
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: "12px",
                  width: "100%",
                  borderCollapse: "collapse",
                  border: "1px solid #ddd",
                }}
              >
                <thead>
                  <tr style={{ wordBreak: "break-all", fontSize: '12px', backgroundColor: '#bbbbbb' }}>

                    <th>Usuário</th>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Status</th>
                    <th>Retirado</th>

                  </tr>
                </thead>
                <tbody>
                  {relatorioDoLocal.map((item, index) => (
                    <tr key={index}>

                      <td>{item.Usuario ? item.Usuario.nome : ''}</td>
                      <td>{item.Produto ? item.Produto.nome : ''}</td>
                      <td>{item.quantidadeRetirada}</td>
                      <td>{item.status}</td>
                      {item.dataRetirada === null ? <td></td> :
                        <td>{moment(item.dataRetirada).format("DD-MM-YYYY")}</td>
                      }

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            ""
          )}
          <DialogActions>
            <Button style={{ color:'red'}}  onClick={() => setModalRelatorioLocal(false)}>
              sair
            </Button>
          </DialogActions>
        </DialogContent>

      </Dialog>




        </div>
    );
};

export default Relatorio;
