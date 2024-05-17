import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SpeedDial } from "@mui/material";


import EditIcon from '@mui/icons-material/Edit';
import { Pagination } from '@mui/material';


import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import moment from "moment";

import React, { useEffect, useState } from 'react';
import { Box } from "@mui/system";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import moment from "moment";
import { Logger } from "sequelize/lib/utils/logger";
const ImageLogo1 = require('../assets/fun.jpg')
const timer = require('../assets/Clock.gif')
const ImageAmbiente = require('../assets/ambiente.jpeg')
const ImageProd = require('../assets/produto1.png')
const getCookie = require('../utils/getCookie')


const Banheiro = (props) => {
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
  const [codigoBanheiro, setCodigoBanheiro] = useState('');
  const [observacao, setObservacao] = useState('');
  // const [nomeProduto, setNomeProduto] = useState('');
  // const [modalMeus, setModalMeus] = useState(false);
  // const [relatorioDoLocal, setRelatorioDoLocal] = useState([]);
  // const [abrirProduto, setAbrirProduto] = useState(false);
  // const [abrirEstoque, setAbrirEstoque] = useState(false);
  // const [abrirAmbiente, setAbrirAmbiente] = useState(false);
  // const [abrirNovoProduto, setAbrirNovoProduto] = useState(false);
  // const [modalRelatorioLocal, setModalRelatorioLocal] = useState(false);

  const [pesquisa, setPesquisa] = useState('');

  const [nomeAmbiente, setNomeAmbiente] = useState('');
  const [pedidosDoFuncionario, setPedidosDoFuncionario] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [relatorioProdutos, setRelatorioProdutos] = useState([]);
  const [todasDoFuncionario, setTodasDoFuncionario] = useState([]);
  const [modalRelatorioFuncionario, setModalRelatorioFuncionario] = useState(false);
  const [modalBanheiro, setModalBanheiro] = useState(false)

  const [arquivo, setArquivo] = useState(null)
  const [listaDeArquivosEnviados, setListaDeArquivosEnviados] = useState([])
  const [banheiros, setBanheiros] = useState([])
  const [limpezaB, setLimpezaB] = useState([])
  const [minhasLimpesas, setMinhasLimpesas] = useState([])
  const [fotos, setFotos] = useState([])
  const [fkLimpezaBanheiro, setFkLimpezaBanheiro] = useState('');
  const [fkLServico, setFkServico] = useState('');
  const [nomeBanheiro, setNomeBanheiro] = useState('');
  const [aprovados, setAprovados] = useState(0);
  const [reprovados, setReprovados] = useState(0);
  const [paraAnalizar, setParaAnalizar] = useState([])

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1; // Número de itens por página

  // Calcular os índices de início e fim para a página atual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  // Filtrar a lista para exibir apenas os itens da página atual
  const itemsToShow = paraAnalizar.slice(startIndex, endIndex);

  // Função para navegar para a próxima página
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Função para navegar para a página anterior
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const [currentPageX, setCurrentPageX] = useState(1);
  const imagesPerPageX = 1; // Número de imagens por página

  const totalImagesX = fotos.length;
  const totalPagesX = Math.ceil(totalImagesX / imagesPerPageX);

  const handleChangePageX = (event, newPage) => {
    setCurrentPageX(newPage);
  };

  const startIndexX = (currentPageX - 1) * imagesPerPageX;
  const endIndexX = Math.min(startIndexX + imagesPerPageX, totalImagesX);
  const paginatedImagesX = fotos.slice(startIndexX, endIndexX);












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


  function carregarBanheiros() {

    const token = getCookie("_token_GSI")
    const params = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }

    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/banheiro/`, params)
      .then(response => {

        const { status } = response

        response.json().then(data => {

          if (status === 401) {
          } else if (status === 200) {
            setBanheiros(data.data)


          }
        })
      })
  }

  useEffect(() => {
    carregarUnidades()
    // Verifica se minhasLimpesas tem pelo menos um item
    if (minhasLimpesas.length > 0) {
      console.log('teste')
      // Obtém o ID do primeiro item em minhasLimpesas
      const idDoItem = minhasLimpesas[0].id;
      // Atualiza o estado fkLimpezaBanheiro com o ID do item
      setFkLimpezaBanheiro(idDoItem);
    }

    if (logged) {
      setFkUsuario(logged.id)
      // alert(logged.Perfil.nome)

    }
  }, [minhasLimpesas]);










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










  useEffect(() => {

    carregarProdutos()

    carregarFuncionarios()
    carregarBanheiros()
    pesquisar()
    carregarArquivos()


    // carregarSetor()

    if (logged && logged.Perfil && logged.Perfil.nome === 'Administrador') {
      carregarAnalise()


    }


    if (logged) {
      setFkUsuario(logged.id)
      // alert(logged.Perfil.nome)

    }


    // if (minhas) {                                         
    //   contagem(minhas)     
    // }






  }, [fkUnidade, fkUnidade, logged, pesquisa, fkLimpezaBanheiro, minhas])






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



  useEffect(() => {

    function carregarMinhas() {

      const token = getCookie("_token_GSI");
      const params = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      fetch(
        `${process.env.REACT_APP_DOMAIN_API}/api/limpezaBanheiro/${fkUsuario}`,
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



  const enviarArquivo = (e, fk) => {


    setArquivo(e)
    console.log(e);
    const form = new FormData()
    form.append('arquivo', e)
    form.append('fk', fk);

    sendFile("POST", `${process.env.REACT_APP_DOMAIN_API}/api/arquivo/`, form)
      .then(response => {
        const { data } = response
        setOpenLoadingDialog(true)
        // alert(data.message)

        setListaDeArquivosEnviados([...listaDeArquivosEnviados, data])
        setCaminho(data.caminho)

        setOpenLoadingDialog(false)
        window.location.reload();


      })
      .catch(err => {
        alert(JSON.stringify(err))

      })
  }


  function carregarArquivos() {


    // setOpenLoadingDialog(true)
    const token = getCookie("_token_GSI");

    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(
      `${process.env.REACT_APP_DOMAIN_API}/api/arquivo/search?pesquisa=${fkLimpezaBanheiro ? fkLimpezaBanheiro : ''}`,
      params
    ).then((response) => {
      const { status } = response;
      response
        .json()
        .then((data) => {
          setOpenLoadingDialog(false);
          if (status === 401) {
          } else if (status === 200) {
            setFotos(data.data);
            setOpenLoadingDialog(false);
          }
        })
        .catch((err) => setOpenLoadingDialog(true));
    });
  }


  const sendFile = (method, url, params) => {
    const token = getCookie("_token_GSI")

    return new Promise(function (resolve, reject) {
      let req = new XMLHttpRequest();
      req.open(method, url);
      req.setRequestHeader("Authorization", `Bearer ${token}`);

      req.addEventListener(
        "load",
        () => {
          if (req.status === 200) {
            resolve(JSON.parse(req.responseText));

          } else {
            reject(JSON.parse(req.responseText));
          }
        },
        false
      );
      req.send(params);
    });
  };

  const onSave = () => {


    // setSetorSolicitante(props.logged.Area.Unidade.nome)

    const token = getCookie('_token_GSI')
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },

      body: JSON.stringify({
        codigoBanheiro,
        observacao,
        listaDeArquivosEnviados,
        fkUsuario,
        caminho,
        status: 'em andamento'




      })

    }


    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/limpezaBanheiro/`, params)
      .then(response => {
        const { status } = response
        response.json().then(data => {
          setOpenLoadingDialog(false)
          if (status === 401) {
            setMessage(data.message)
            setOpenMessageDialog(true)
          } else if (status === 200) {
            setLimpezaB(data.data)
            setOpenLoadingDialog(false)
            // alert(data.message)
            window.location.reload();




            // setArea(data.data)
          }
        }).catch(err => setOpenLoadingDialog(true))
      })
  }


  const onSaveNovo = () => {
    // alert('1')
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
        nomeBanheiro,
        codigoBanheiro



      })
    }

    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/banheiro/`, params)
      .then(response => {
        const { status } = response
        response.json().then(data => {
          setOpenLoadingDialog(false)
          if (status === 401) {
            setMessage(data.message)
            setOpenMessageDialog(true)
            // window.location.pathname = "/login"
          } else if (status === 200) {
            window.location.reload();
            // setOpen(false)
            // alert(JSON.stringify(data.data))

            alert(data.message)
            setOpenMessageDialog(true)

            // setArea(data.data)
          }
        }).catch(err => setOpenLoadingDialog(true))
      })
  }




  const onSaveEdit
    = () => {
      // alert(fkLimpezaBanheiro)


      // setSetorSolicitante(props.logged.Area.Unidade.nome)

      const token = getCookie('_token_GSI')
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },

        body: JSON.stringify({
          fkLimpezaBanheiro



        })

      }


      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/limpezaBanheiro/${fkLimpezaBanheiro}/edit`, params)
        .then(response => {
          const { status } = response
          response.json().then(data => {
            setOpenLoadingDialog(false)
            if (status === 401) {
              setMessage(data.message)
              setOpenMessageDialog(true)
            } else if (status === 200) {
              setLimpezaB(data.data)
              setOpenLoadingDialog(false)
              alert(data.message)
              window.location.reload();




              // setArea(data.data)
            }
          }).catch(err => setOpenLoadingDialog(true))
        })
    }

  const onSaveEditAdm
    = (fk, s) => {
      // alert(fkLimpezaBanheiro)
      const status = s

      // setSetorSolicitante(props.logged.Area.Unidade.nome)

      const token = getCookie('_token_GSI')
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },

        body: JSON.stringify({
          fkLimpezaBanheiro,
          status



        })

      }


      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/limpezaBanheiro/${fk}/editAdm`, params)
        .then(response => {
          const { status } = response
          response.json().then(data => {
            setOpenLoadingDialog(false)
            if (status === 401) {
              setMessage(data.message)
              setOpenMessageDialog(true)
            } else if (status === 200) {
              setLimpezaB(data.data)
              setOpenLoadingDialog(false)
              alert(data.message)
              window.location.reload();




              // setArea(data.data)
            }
          }).catch(err => setOpenLoadingDialog(true))
        })
    }

  function carregarAnalise() {

    const token = getCookie("_token_GSI")
    const params = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }

    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/limpezaBanheiro/`, params)
      .then(response => {

        const { status } = response

        response.json().then(data => {

          if (status === 401) {
          } else if (status === 200) {
            setParaAnalizar(data.data)

          }
        })
      })
  }





  function pesquisar() {
    const token = getCookie("_token_GSI");
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade${pesquisa?`/search?&pesquisa=${pesquisa}` : ''
    fetch(
      `${process.env.REACT_APP_DOMAIN_API}/api/limpezaBanheiro/search?pesquisa=${logged ? logged.id : ''}`,
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
            setMinhasLimpesas(data.data);
            // alert(JSON.stringify(respostas))
            // filtrarUsuariosDemandados()
          }
        })
        .catch((err) => console.log(err));
    });
  }


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
            <div>
              <Button variant="contained" onClick={() => setModalBanheiro(true)}>
                {'Cadastrar ambiente para acompanhamento'}
              </Button>

              <div>
                {/* Conteúdo da página atual */}
                <b>Ambientes para análise</b><br />
                {itemsToShow.map((item, key) => (
                  <b key={key} style={{ color: 'blue', fontSize: 11 }}>
                    <div
                      style={{
                        maxWidth: '720px',
                        margin: 'auto',
                        marginBottom: '20px',
                        padding: '20px',
                        flexDirection: 'row',
                        border: '2px solid #ccc',
                        borderRadius: '12px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        cursor: 'pointer',
                      }}
                    >
                      <p style={{ marginBottom: '10px' }}>
                        <strong>Status:</strong> {item.status}<br />
                        <strong>Funcionário:</strong> {item.Usuario.nome}<br />
                        <strong>Local:</strong> {item.Banheiro.descricao}<br />
                        <strong>Início:</strong> {moment(item.createdAt).format("DD-MM-YYYY HH:mm:ss")}<br />
                        <strong>Hora de início:</strong> {moment(item.createdAt).format("HH:mm:ss")}<br />
                        <strong>Hora de conclusão:</strong> {moment(item.updatedAt).format("HH:mm:ss")}<br />
                      </p>

                      <p style={{ marginBottom: '10px' }}><strong>Imagens:</strong></p>
                      {/* Iterar sobre os arquivos dentro do objeto item.Arquivos */}
                      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {item.Arquivos.map((arquivo, arquivoKey) => (
                          <div key={arquivoKey} style={{ marginRight: '10px', marginBottom: '10px' }}>
                            <img
                              src={`${process.env.REACT_APP_DOMAIN_API}/api/arquivo/${arquivo.id}`}
                              alt={item.nomeApresentacao}
                              style={{ width: '300px', height: '300px' }}
                            />
                            <hr />
                            <p></p>
                            {/* Adicione aqui qualquer lógica adicional que você queira aplicar a cada arquivo */}
                          </div>
                        ))}
                      </div>




                      <Button variant="contained" onClick={() => onSaveEditAdm(item.id, 'aprovado')}>
                        {'aprovar'}
                      </Button>
                      <Button
                        variant="contained"
                        style={{ marginLeft: '10px' }}
                        color="error"
                        onClick={() => onSaveEditAdm(item.id, 'reprovado')}
                      >
                        {'reprovar'}
                      </Button>
                    </div>
                  </b>
                ))}

                {/* Controles de navegação */}
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  <Button onClick={prevPage} disabled={currentPage === 1}>
                    Anterior
                  </Button>
                  <span style={{ margin: '0 10px' }}>Página {currentPage}</span>
                  <Button onClick={nextPage} disabled={endIndex >= paraAnalizar.length}>
                    Próxima
                  </Button>
                </div>
              </div>




            </div>
            : ''
          }




          {logged && logged.Perfil && logged.Perfil.nome === 'Usuario' ?

            <div >
              <div style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '5px' }}>
                <h4>Seus Serviços:</h4>
                Em Analise: {minhas ? minhas.filter(item => item.status === 'Concluido').length : ''}<br></br><hr></hr>
                Aprovado: {minhas ? minhas.filter(item => item.status === 'aprovado').length : ''}<br></br><hr></hr>
                Reprovado: {minhas ? minhas.filter(item => item.status === 'reprovado').length : ''}<br></br>

              </div>
              <p></p>

              <div>

                {
                  minhasLimpesas.length > 0 ?
                    <a style={{ textDecoration: 'none' }}>
                      <div
                        style={{
                          width: '100%', // Definindo largura fixa
                          height: '250px', // Definindo altura fixa
                          textAlign: 'center',
                          padding: '10px', // Adiciona um espaço interno para a borda
                          border: '2px solid #ccc', // Aumenta a largura da borda
                          borderRadius: '12px', // Bordas arredondadas
                          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Sombra moderada
                          cursor: 'pointer', // Altera o cursor ao passar o mouse
                        }}
                      >
                        <b>Serviço em andamento, conclua para abrir um novo</b><br />
                        <img src={timer} style={{ width: '100px', height: '100px', borderRadius: '8px' }} />
                      </div>
                    </a>
                    :
                    <TextField
                      size="small"
                      fullWidth
                      label="Codigo do Ambiênte"
                      value={codigoBanheiro}
                      onChange={e => setCodigoBanheiro(e.target.value)}
                    />

                }



                {banheiros
                  .filter(item => item.codigo === codigoBanheiro)
                  .map((item, key) => (
                    <b key={key} style={{ color: 'blue', fontSize: 15 }}>
                      {'Ambiênte: ' + item.descricao}
                      <br />
                      <Button variant="contained"
                        //  disabled={botaoDesabilitado}
                        onClick={onSave}>{'Iniciar Limpeza do ambiente'}</Button>
                    </b>
                  ))
                }

              </div>

              <hr />



              <p></p>
              <div
                style={{
                  width: '100%', // Definindo largura fixa
                  height: '100%', // Definindo altura fixa
                  textAlign: 'center',
                  padding: '10px', // Adiciona um espaço interno para a borda
                  border: '2px solid #ccc', // Aumenta a largura da borda
                  borderRadius: '12px', // Bordas arredondadas
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Sombra moderada
                  cursor: 'pointer', // Altera o cursor ao passar o mouse
                }}
              >

                {minhasLimpesas.map((item, key) => (
                  <div style={{}}>
                    <b style={{ color: 'red' }}>Serviço em andamento</b><br></br>
                    <b key={key} style={{ fontSize: 16 }}>
                      {'Local: ' + item.Banheiro.descricao}<br></br>
                      {'Status: ' + item.status}<br></br>

                      <b>Data: </b>{moment(item.createdAt).format("DD-MM-YYYY")}<br></br>

                      <b>Hora de inicio: </b>{moment(item.createdAt).format("HH:mm:ss")}<br></br>
                      <br />

                      Envie fotos antes, durante e depois do seu atendimento
                      <div className="custom-file">
                        <input type="file" className="custom-file-input" id="customFile"
                          onChange={(e) => enviarArquivo(e.target.files[0], item.id)}
                        />
                        <label className="custom-file-label" htmlFor="customFile">Envie foto do serviço</label>
                      </div>

                      <hr />
                      {/* <Button variant="contained"
            
                        onClick={onSave}>{'Iniciar Limpeza do ambiente'}</Button> */}
                    </b>

                  </div>

                ))
                }




                <div>
                  {paginatedImagesX.map((item, index) => (
                    <div key={index}>
                      <img
                        src={`${process.env.REACT_APP_DOMAIN_API}/api/arquivo/${item.id}`}
                        alt={item.nomeApresentacao}
                        style={{ width: '250px', height: '300px' }}
                      />
                      <br />
                    </div>
                  ))}
                  <center>
                    <Pagination
                      count={totalPagesX}
                      page={currentPageX}
                      onChange={handleChangePageX}
                      variant="outlined"
                      shape="rounded"
                    />

                  </center>

                </div>



                <p></p>

                {fotos.length > 2 ?

                  <Button variant="contained"

                    onClick={onSaveEdit}>{'serviço concluido, enviar para analise'}</Button>

                  : ''
                }



                <hr></hr>


                {/* {listaDeArquivosEnviados.length === 3 ?
                  <div>
                    <TextField size="small"
                      fullWidth label="Observação"
                      variant="outlined"
                      multiline
                      rows={3}
                      value={observacao}
                      onChange={e => setObservacao(e.target.value)}


                    /><p></p>

                    <TextField
                      size="small"
                      fullWidth
                      label="Codigo do Ambiênte"
                      value={codigoBanheiro}
                      onChange={e => setCodigoBanheiro(e.target.value)}
                    />

                  </div>

                  : ""} */}




                <p></p>

                {/* {banheiros
                  .filter(item => item.codigo === codigoBanheiro)
                  .map((item, key) => (
                    <b key={key} style={{ color: 'blue', fontSize: 11 }}>
                      {'Banheiro: ' + item.descricao}
                      <br />
                    </b>
                  ))
                }

                <hr />

                {codigoBanheiro && listaDeArquivosEnviados.length === 3 ?
                  <Button variant="contained"
                    //  disabled={botaoDesabilitado}
                    onClick={onSave}>{'Enviar para análise'}</Button>
                  : ''

 */}








              </div>



            </div>











            : ''}






        </div>
      </div>

      <Dialog
        open={modalBanheiro}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          Cadastro de ambiênte
        </DialogTitle>
        <DialogContent style={{ width: '100%', maxWidth: 600, overflowX: 'auto' }}>

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
            <div>
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
              </FormControl><p></p>

              <FormControl fullWidth size="small">
                <TextField
                  fullWidth

                  label='Nome do ambiente'
                  value={nomeBanheiro}
                  onChange={e => setNomeBanheiro(e.target.value)}
                />
              </FormControl><p></p>

              <FormControl fullWidth size="small">
                <TextField
                  fullWidth

                  label='Codigo'
                  value={codigoBanheiro}
                  onChange={e => setCodigoBanheiro(e.target.value)}

                />
              </FormControl>

            </div>






            : ""}

          {fkLocal && nomeBanheiro && codigoBanheiro ?

            <Button onClick={onSaveNovo}>Salvar</Button>

            : ""}







          <DialogActions>
            <Button onClick={() => setModalBanheiro(false)}>
              sair
            </Button>
          </DialogActions>
        </DialogContent>

      </Dialog>









    </div>
  );
};

export default Banheiro;
