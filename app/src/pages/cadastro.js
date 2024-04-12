import { CircularProgress, FormControl, InputLabel, MenuItem, Select, SpeedDial } from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import TaskFilter from '../components/task-filter'
import TaskItem from '../components/task-item'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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
const ImageLogo1 = require('../assets/inserirEstoque.jpg')
const ImageAmbiente = require('../assets/ambiente.jpeg')
const ImageProd = require('../assets/produto1.png')
const getCookie = require('../utils/getCookie')


const Cadastro = (props) => {
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



    const [chamado, setChamado] = useState(null);

    const [fkUsuario, setFkUsuario] = useState(null);
    const [fkCham, setFkCham] = useState(null);
    const [executor, setExecutor] = useState('');
    const [obsDemandante, setObsDemandante] = useState('');
    const [criticidadeChefe, setCriticidade] = useState(null)
    const [fkLocal, setFkLocal] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [fkProduto, setFkProduto] = useState('');
    const [nomeProduto, setNomeProduto] = useState('');
    const [modalMeus, setModalMeus] = useState(false);
    const [abrirProduto, setAbrirProduto] = useState(false);
    const [abrirEstoque, setAbrirEstoque] = useState(false);
    const [abrirAmbiente, setAbrirAmbiente] = useState(false);
    const [abrirNovoProduto, setAbrirNovoProduto] = useState(false);

    const [pesquisa, setPesquisa] = useState('');
    const [nomeAmbiente, setNomeAmbiente] = useState('');
    const [pedidosDoFuncionario, setPedidosDoFuncionario] = useState([]);







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
            `${process.env.REACT_APP_DOMAIN_API}/api/local/?id=${fkUnidade}`,
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




    const onSaveEstoque = () => {

        const usuario = logged.id

        setOpenLoadingDialog(true)
        const token = getCookie("_token_GSI")
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({

                fkProduto,
                quantidade,
                usuario
            })
        }

        fetch(`${process.env.REACT_APP_DOMAIN_API}/api/produto/${fkProduto}/editEstoque`, params)
            .then(response => {
                const { status } = response
                response.json().then(data => {
                    setOpenLoadingDialog(false)
                    if (status === 401) {
                        setMessage(data.message)
                        setOpenMessageDialog(true)
                        // window.location.pathname = "/login"
                    } else if (status === 200) {
                        // setOpen(false)
                        // alert(JSON.stringify(data.data))
                        setMessage(data.message)
                        alert(data.message)
                        setOpenMessageDialog(true)
                        setSolicitar(false)
                        window.location.reload();
                        // setArea(data.data)
                    }
                }).catch(err => setOpenLoadingDialog(true))
            })
    }


    const onSaveAmbiente = () => {

        setOpenLoadingDialog(true)
        const token = getCookie("_token_GSI")
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({

                fkUnidade,
                nomeAmbiente
            })
        }

        fetch(`${process.env.REACT_APP_DOMAIN_API}/api/local/`, params)
            .then(response => {
                const { status } = response
                response.json().then(data => {
                    setOpenLoadingDialog(false)
                    if (status === 401) {
                        setMessage(data.message)
                        setOpenMessageDialog(true)
                        // window.location.pathname = "/login"
                    } else if (status === 200) {
                        // setOpen(false)
                        // alert(JSON.stringify(data.data))

                        alert(data.message)
                        setOpenMessageDialog(true)

                        window.location.reload();
                        // setArea(data.data)
                    }
                }).catch(err => setOpenLoadingDialog(true))
            })
    }


    const onSaveProduto = () => {

        setOpenLoadingDialog(true)
        const token = getCookie("_token_GSI")
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({

                nomeProduto,
                quantidade,
                descricao
            })
        }

        fetch(`${process.env.REACT_APP_DOMAIN_API}/api/produto/`, params)
            .then(response => {
                const { status } = response
                response.json().then(data => {
                    setOpenLoadingDialog(false)
                    if (status === 401) {
                        setMessage(data.message)
                        setOpenMessageDialog(true)
                        // window.location.pathname = "/login"
                    } else if (status === 200) {
                        // setOpen(false)
                        // alert(JSON.stringify(data.data))

                        alert(data.message)
                        setOpenMessageDialog(true)

                        window.location.reload();
                        // setArea(data.data)
                    }
                }).catch(err => setOpenLoadingDialog(true))
            })
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

        if (fkUnidade) {
            carregarSetor()
        }

        if (logged) {
            setFkUsuario(logged.id)
            // alert(logged.Perfil.nome)

        }

        if (pesquisa) {
            pesquisar()
        }




        // if(minhas){
        //   alert(JSON.stringify(minhas))
        // }

    }, [fkUnidade, fkUnidade, logged, pesquisa])

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

    function deletarSolicitacao(id) {

        // alert(id)
        setOpenLoadingDialog(true)
        const token = getCookie("_token_GSI")
        const params = {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        fetch(`${process.env.REACT_APP_DOMAIN_API}/api/pedido/${id}/delete`, params)
            .then(response => {

                const { status } = response

                response.json().then(data => {

                    if (status === 401) {
                        // mensagens('Alteração falhou, tente novamente')


                    } else if (status === 200) {
                        alert(data.message)
                        // setModalData(false)

                        window.location.href = `${process.env.REACT_APP_DOMAIN}/home`;


                    }
                })
            })
    }

    let qtd = 0
    let idProduto = ''
    let idPed = ''

    const Entregar = (idProd, qtd, idPedido) => {

        setOpenLoadingDialog(true)
        // setModalEntrevista(false)

        qtd = qtd
        idProduto = idProd
        idPed = idPedido



        const token = getCookie("_token_GSI")
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                qtd,
                idProduto,
                idPed

            })


        }

        fetch(`${process.env.REACT_APP_DOMAIN_API}/api/produto/${idProd}/edit`, params)
            .then(response => {
                const { status } = response
                response.json().then(data => {

                    // alert(data)
                    setOpenLoadingDialog(false)
                    if (status === 401) {
                        setOpenMessageDialog(false)
                        // setModalEntrevista(false)
                        setOpenMessageDialog(true)
                    } else if (status === 200) {
                        setOpenMessageDialog(false)
                        alert(data.message)

                        // setModalEntrevista(false)
                        window.location.reload();


                    }

                }).catch(err => setOpenLoadingDialog(true))
            })

    }
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
                            <a style={{ textDecoration: 'none' }}>
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
                                    <b>Novo Produto</b><br />
                                    <img src={ImageProd} style={{ width: '180px', borderRadius: '8px' }} onClick={() => setAbrirNovoProduto(true)} />
                                </div>
                            </a>

                            <a style={{ textDecoration: 'none' }}>
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
                                    <b>Novo Ambiente</b><br />
                                    <img src={ImageAmbiente} style={{ width: '180px', borderRadius: '8px' }} onClick={() => setAbrirAmbiente(true)} />
                                </div>
                            </a>

                            <a style={{ textDecoration: 'none' }}>
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
                                    <b>Inserir Produto no Estoque</b><br />
                                    <img src={ImageLogo1} style={{ width: '180px', borderRadius: '8px' }} onClick={() => setAbrirEstoque(true)} />
                                </div>
                            </a>
                        </div>


                        : 'Você não está autorizado a entrar nessa página'}



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
                <b style={{ marginLeft: '10px' }} >Insira produto no estoque
                </b>
                <DialogContent style={{ width: 400 }}>

                    <FormControl fullWidth>
                        <InputLabel htmlFor="demo-select-small">Produto*</InputLabel>
                        <Select
                            size="small"
                            fullWidth
                            labelId="demo-select-small"
                            id="demo-select-small"
                            label="Perfil"
                            value={fkProduto}

                        >

                            {produtos.map((item, index) => <MenuItem key={index} value={item.id} onClick={() => setFkProduto(item.id)}>{item.nome}</MenuItem>)}
                        </Select>
                        <p></p>
                    </FormControl><p></p>

                    <FormControl fullWidth size="small">
                        <TextField
                            fullWidth
                            variant="outlined"
                            label='Quantidade'
                            value={quantidade}
                            onChange={handleInputChange}
                        />
                    </FormControl>




                </DialogContent>

                {fkProduto && quantidade ?

                    <Button onClick={onSaveEstoque}>Salvar</Button>

                    : ""}
                <DialogActions >

                    <Button onClick={() => setAbrirEstoque(false)}>
                        sair
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={abrirNovoProduto}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <b style={{ marginLeft: '10px' }} >Cadastre um novo produto
                </b>
                <DialogContent style={{ width: 400 }}>


                    <TextField
                        margin="normal"
                        required
                        size="small"
                        fullWidth
                        id="nome "
                        label="Nome do produto"
                        onChange={e => setNomeProduto(e.target.value)}
                    />

                    <TextField
                        margin="normal"
                        required
                        size="small"
                        fullWidth
                        id="descricao"
                        label="Descrição"
                        onChange={e => setDescricao(e.target.value)}
                    />

                    <FormControl fullWidth size="small">
                        <TextField
                            fullWidth
                            variant="outlined"
                            label='Quantidade'
                            value={quantidade}
                            onChange={handleInputChange}
                        />
                    </FormControl>




                </DialogContent>

                {nomeProduto && descricao && quantidade ?

                    <Button onClick={onSaveProduto}>Salvar</Button>

                    : ""}
                <DialogActions >

                    <Button onClick={() => setAbrirNovoProduto(false)}>
                        sair
                    </Button>
                </DialogActions>
            </Dialog>



            <Dialog
                open={abrirAmbiente}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <b style={{ marginLeft: '10px' }} >Cadastre um novo Ambiente
                </b>
                <DialogContent style={{ width: 400 }}>

                    <FormControl fullWidth>
                        <InputLabel htmlFor="demo-select-small">Unidade*</InputLabel>
                        <Select
                            size="small"
                            fullWidth
                            labelId="demo-select-small"
                            id="demo-select-small"
                            label="Unidade"
                            value={fkUnidade}

                        >

                            {unidades.map((item, index) => <MenuItem key={index} value={item.id} onClick={() => setFkUnidade(item.id)}>{item.nome}</MenuItem>)}
                        </Select>
                        <p></p>
                    </FormControl>

                    <FormControl fullWidth size="small">
                        <TextField
                            fullWidth
                            variant="outlined"
                            label='Nome do Ambiente'
                            value={nomeAmbiente}
                            onChange={handleInputChange1}
                        />
                    </FormControl>




                </DialogContent>

                {fkUnidade && nomeAmbiente ?

                    <Button onClick={onSaveAmbiente}>Salvar</Button>

                    : ""}
                <DialogActions >

                    <Button onClick={() => setAbrirAmbiente(false)}>
                        sair
                    </Button>
                </DialogActions>
            </Dialog>
            {/* 
            <Dialog
    open={abrirEstoque}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    style={{ textAlign: 'center', margin: 'auto', minWidth: '200px' }}
>
    <FormControl fullWidth>
        <InputLabel htmlFor="demo-select-small">Produto*</InputLabel>
        <Select
            size="small"
            fullWidth
            labelId="demo-select-small"
            id="demo-select-small"
            label="Produto"
            value={setFkProduto}
        >
            {produtos.map((item, index) => (
                <MenuItem key={index} value={item.id} onClick={() => setFkProduto(item.id)}>
                    {item.nome}
                </MenuItem>
            ))}
        </Select>
        <p></p>
    </FormControl>

    <DialogActions>
        <Button onClick={() => setAbrirEstoque(false)}>sair</Button>
    </DialogActions>
</Dialog> */}





        </div>
    );
};

export default Cadastro;
