import { CircularProgress, FormControl, InputLabel, MenuItem, Select, Chip } from "@mui/material";

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
const getCookie = require('../utils/getCookie')


const Home = (props) => {
  const { logged } = props;
  const [openLoadingDialog, setOpenLoadingDialog] = useState(false)
  const [openMessageDialog, setOpenMessageDialog] = useState(false)
  const [message, setMessage] = useState('')

  // const [titulo, setTitulo] = useState('');
  // const [descricao, setDescricao] = useState('');
  // const [caminho, setCaminho] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [unidades, setUnidades] = useState([]);
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
  const [fkPoduto, setFkProduto] = useState('');
  const [nomeProduto, setNomeProduto] = useState('');
  const [modalMeus, setModalMeus] = useState(false);
  const [pesquisa, setPesquisa] = useState('');
  const [pedidosDoFuncionario, setPedidosDoFuncionario] = useState([]);
  const [relatorioDoLocal, setRelatorioDoLocal] = useState([]);
  const [modalRelatorioLocal, setModalRelatorioLocal] = useState(false);
  const [localRelatorio, setLocalRelatorio] = useState('');
  const [filtroNome, setFiltroNome] = useState('');
  const [estoqueAtual, setEstooqueAtual] = useState(null);







  const [open, setOpen] = useState(false);



  useEffect(() => {
    function carregarSetor() {
      // alert(fkUnidade)

      // setOpenLoadingDialog(true)
      const token = getCookie("_token_GSI");

      const params = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      fetch(
        `${process.env.REACT_APP_DOMAIN_API}/api/local/search?pesquisa=${fkUnidade}`,
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

    if (fkUnidade) {
      carregarSetor()


    }
  }, [fkUnidade])


  function carregarRelatorioSetor(id, local) {
    setLocalRelatorio(local)


    // setOpenLoadingDialog(true)
    const token = getCookie("_token_GSI");
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(
      `${process.env.REACT_APP_DOMAIN_API}/api/local/searchRelatorio?pesquisa=${id}`,
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





  const produtosFiltrados = produtos.filter(item => item.nome.toLowerCase().includes(filtroNome.toLowerCase()));


  const onSave = () => {
    // alert('1')


    if(quantidade > estoqueAtual){
      alert('O estoque do produto é de : '+ estoqueAtual +' você está solicitanto: '+ quantidade)
    }else{
      setOpenLoadingDialog(true)
    const token = getCookie("_token_GSI")
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        fkLocal,
        fkPoduto,
        fkUsuario,
        quantidade
      })
    }

    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/pedido/`, params)
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

  const handleInputChange = (event) => {

    
    const value = event.target.value;
    // Verificar se o valor é numérico antes de atualizar o estado
    if (!isNaN(value)) {
      setQuantidade(value);
    }
  };





  useEffect(() => {

    carregarProdutos()
    carregarUnidades()


    if (logged) {
      setFkUsuario(logged.id)
      // alert(logged.Perfil.nome)

    }

    if (pesquisa.length > 3) {
      pesquisar()
    }




   

  }, [logged, pesquisa, minhas])



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
  const funcao = (id, nome, estoqueAtual) => {
    setEstooqueAtual(estoqueAtual)
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
              // alert(data.message)
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



  return (

    <div style={{ marginLeft: '20px', marginTop: '10px' }}>
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



      {logged && logged.Perfil && logged.Perfil.nome === 'Administrador' ?
        <div>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
            }}
          >
            <TextField
              fullWidth
              id="filled-basic"
              // variant="filled"
              label="Solicitações em aberto, informe o nome do funcionario"
              name="pesquisa"
              value={pesquisa}

              style={{ backgroundColor: "#FFFACD" }}
              onChange={(e) => setPesquisa(e.target.value)}
            />
            <p></p>

            {/* <Button type="button" className="btn btn-primary" onClick={(e) => { pesquisar() }}>Buscar </Button> */}
          </Box>

          {pedidosDoFuncionario.length > 0 ? (
            <center>
              <table
                className="table table-striped"
                style={{
                  border: '1px solid #ccc', // Adiciona uma borda de 5px sólida cinza
                  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)', // Adiciona sombreado
                  borderRadius: '10px', // Adiciona bordas arredondadas de 10px
                  width:'100%',
                  backgroundColor: '#080f00',
                 
                }}
              >
                <tbody>
                  <tr style={{ wordBreak: "break-all", fontSize: '20px', color:'#fff' }}>
                    <td colSpan="5"><b>Pedido não retirados de  {pesquisa}</b></td>


                  </tr>
                  <tr style={{  color:'#fff'}}>
                  <td>Funcionario</td>
                    <td>Produto</td>
                    
                    <td>Local</td>
                  </tr>

                  {pedidosDoFuncionario.map((item, index) => (
                    <tr key={index} style={{ border:'10px', color:'#fff'}}>
                       <td >{item.Usuario ? item.Usuario.nome : ''}<br></br>
                       <Button
                          style={{ marginLeft: '5px' ,color:'red'}}

                          size="small"
                          onClick={() =>
                            carregarRelatorioFuncionario(item.Usuario.id, item.Usuario.nome)
                          }
                        >
                          veja todos pedidos do funcionario
                        </Button>
                       
                       </td>
                      <td >{item.Produto ? item.Produto.nome : ''}<Chip label= {'qtd: '+item.quantidadeRetirada} color="success" ></Chip></td>
                     
                      <td>{item.Local ? item.Local.nome : ''}<br></br>
                        <Button
                          style={{ marginLeft: '5px' , color:'red'}}

                          size="small"
                          onClick={() =>
                            carregarRelatorioSetor(item.Local.id, item.Local.nome)
                          }
                        >
                          veja todos pedidos desse local
                        </Button>

                      </td>
                      <td>
                        {item.status === "não retirado" ?
                          <Button
                            style={{ marginLeft: '5px' }}
                            variant="contained"
                            size="small"
                            onClick={() =>
                              Entregar(item.Produto.id, item.quantidadeRetirada, item.id)
                            }
                          >
                            Entregar
                          </Button>

                          :
                          <Button
                            style={{ marginLeft: '5px' }}
                            variant="contained"
                            size="small"
                            color="success"

                          >
                            Já retirado
                          </Button>
                        }


                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </center>
          ) : (
            ""
          )}


        </div>

        : ""}







      {produtos ? (
        <center>
          <table
            className="table table-striped"
            style={{
              fontFamily: "arial",
              fontSize: "12px",
              marginLeft: 10,
              marginRight: 10,
              width: "100%",
            }}
          >
            <tbody>



              <div>
                {/* <input
                  type="text"
                  placeholder="Filtrar por nome"
                  value={filtroNome}
                  onChange={(e) => setFiltroNome(e.target.value)}
                /> */}<p></p>

                <TextField

                  fullWidth
                  id="filled-basic"
                  // variant="filled"
                  label="Nome do Produto"
                  name="Nome do Produto"
                  value={filtroNome}
                  onChange={(e) => setFiltroNome(e.target.value)}

                  style={{ backgroundColor: "#FFFACD", width: '300px' }}

                /><p></p>
                <table style={{
                  border: '1px solid #ccc', // Adiciona uma borda de 5px sólida cinza
                  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)', // Adiciona sombreado
                  borderRadius: '10px', // Adiciona bordas arredondadas de 10px
                  width:'100%'
                  
                }}>

                  <tr style={{ wordBreak: "break-all", fontSize: '20px' }}>
                    
                    <td colSpan="3">{minhas.length > 0 ?
                      <Button
                        startIcon={<ShoppingCartIcon />}
                       color="success"
                      variant="contained"
                        // style={{ color: 'yellow' }}

                      size="small"
                      onClick={() =>
                        setModalMeus(true)
                      }
                      >
                      Veja seu pedido 
                    </Button>
                      : ''}</td>
                </tr>
                <tr style={{ backgroundColor: '#A0C3F1', fontSize:'18px' }}>
                  <td >Produto

                  </td>
                  <td>Estoque

                  </td>
                  <td></td>
                </tr>

                {produtosFiltrados.map((item, index) => (
                  <tr key={index}>
                    <td style={{ wordBreak: "break-all", fontSize:'18px' }}><b>{item.nome }</b></td>
                    {/* <td style={{ wordBreak: "break-all", color: item < 5 ? 'red' : 'inherit' }}><b>{item.qtdEstoque}</b></td> */}
                    <td style={{ wordBreak: "break-all", fontSize:'18px', color: parseInt(item.qtdEstoque) < 5 ? 'red' : 'inherit' }}><b>{item.qtdEstoque}</b></td>


                    <td>
                      {item.qtdEstoque === 0 ? (
                        <Button
                          variant="contained"
                          color='error'

                          size="small"
                          
                          // onClick={() => funcao(item.id, item.nome)}
                        >
                          esgotado
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => funcao(item.id, item.nome, item.qtdEstoque)}
                        >
                          solicitar
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}

              </table>

            </div>
          </tbody>
        </table>
        </center>
  ) : (
    ""
  )
}








      <Dialog open={openLoadingDialog}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 120, height: 120 }}>
          <CircularProgress />
        </div>
      </Dialog>
      <Dialog
        open={solicitar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          Solicitação de {nomeProduto}
        </DialogTitle>
        <DialogContent style={{ width: 400 }}>

          {/* <FormControl fullWidth>
            <InputLabel htmlFor="demo-select-small">Quantidade*</InputLabel>
            <Select
              size="small"
              fullWidth
              labelId="demo-select-small"
              id="demo-select-small"
              label="Quantidade"
              value={quantidade}

            >

              <MenuItem value={1} onClick={() => setQuantidade(1)}>1</MenuItem>
              <MenuItem value={2} onClick={() => setQuantidade(2)}>2</MenuItem>
              <MenuItem value={3} onClick={() => setQuantidade(3)}>3</MenuItem>
              <MenuItem value={4} onClick={() => setQuantidade(4)}>4</MenuItem>
              <MenuItem value={5} onClick={() => setQuantidade(5)}>5</MenuItem>
              <MenuItem value={6} onClick={() => setQuantidade(6)}>6</MenuItem>
              <MenuItem value={7} onClick={() => setQuantidade(7)}>7</MenuItem>
            </Select>
            <p></p>
          </FormControl> */}

          <FormControl fullWidth size="small">
            <TextField
              fullWidth
              variant="outlined"
              label='Quantidade'
              value={quantidade}
              onChange={handleInputChange}
            />
          </FormControl>
          <p></p>

          <FormControl fullWidth>
            <InputLabel htmlFor="demo-select-small">Unidade*</InputLabel>
            <Select
              size="small"
              fullWidth
              labelId="demo-select-small"
              id="demo-select-small"
              label="Perfil"
              value={fkUnidade}

            >

              {unidades.map((item, index) => <MenuItem key={index} value={item.id} onClick={() => setFkUnidade(item.id)}>{item.nome}</MenuItem>)}
            </Select>
            <p></p>
          </FormControl>

          {setores.length > 0 ?
            <FormControl fullWidth>
              <InputLabel htmlFor="demo-select-small">Local*</InputLabel>
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
            </FormControl>

            : ""}
        </DialogContent>

        {fkLocal && fkPoduto && fkUsuario && quantidade ?

          <Button onClick={onSave}>Salvar</Button>

          : ""}
        <DialogActions >

          <Button style={{ color:'red'}} onClick={() => setSolicitar(false)}>
            sair
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={modalMeus}>
      

        {minhas ? (
          <center>
            <table
              className="table table-striped"
              style={{
                fontFamily: "arial",
                fontSize: "12px",
                marginLeft: 10,
                marginRight: 10,
                width: "100%",
              }}
            >
              <tbody>
                <tr style={{ wordBreak: "break-all", fontSize: '20px' }}>

                <b>Para retirar no estoque </b>
                </tr>


                {minhas.map((item, index) => (
                  <tr key={index}>
                   <td>{item.Local ? item.Local.nome : ''}</td>
                    <td >{item.nome}</td>
                    <td>{item.Produto ? item.Produto.nome : ''}</td>
                    <td>qtd: {item.quantidadeRetirada}</td>
                    <td> {item.status === 'não retirado' ?
                      <Button variant="contained" size="small" color="error" style={{ textTransform: 'none', fontSize: '12px' }}
                        onClick={() => [deletarSolicitacao(item.id)]}
                      >
                        <DeleteForeverIcon></DeleteForeverIcon>
                      </Button>


                      : item.status}


                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </center>
        ) : (
          ""
        )}
        <DialogActions >

          <Button  style={{ color:'red'}} onClick={() => setModalMeus(false)}>
            sair
          </Button>
        </DialogActions>




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
            <Button style={{ color:'red'}} onClick={() => setModalRelatorioLocal(false)}>
              sair
            </Button>
          </DialogActions>
        </DialogContent>

      </Dialog>









    </div >
  );
};

export default Home;
