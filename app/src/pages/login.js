import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import { FormControl, InputLabel, MenuItem, Select, SpeedDial } from "@mui/material";
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import isAutenticated from "../utils/isAuthenticated";
import { CircularProgress, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

const ImageBackground = require('../assets/bg-image.jpeg')
const ImageLogo = require('../assets/senac_logo.png')
const getCookie = require('../utils/getCookie')




const theme = createTheme()

const Login = () => {
  const [email, setEmail] = useState('')
  const [openLoadingDialog, setOpenLoadingDialog] = useState(false)
  const [password, setPassword] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [openMessageDialog, setOpenMessageDialog] = useState(false)
  const [message, setMessage] = useState('')
  const [autenticated, setAutenticated] = useState(false);
  const [verified, setVerified] = useState(false);
  const [modalCadastro, setModalCadastro] = useState(false);
  const [modalRecuperar, setModalRecuperar] = useState(false);
  const [nome, setNome] = useState('')
  const [chapa, setChapa] = useState('')
  const [senha, setSenha] = useState('')
  const [fkPerfil, setFkPerfil] = useState('')
  const [cpf, setCpf] = useState('')
  const [perfis, setPerfis] = useState([])
  const [funcionarioAlterado, setFuncionarioAlterado] = useState('')

  const [funcionarioChecado, setFuncionarioChecado] = useState([])


  const handleCloseMessageDialog = () => setOpenMessageDialog(false)

  useEffect(() => {
    isAutenticated().then((_) => {
      setAutenticated(_.logged);
      setVerified(true);
    });
  }, []);

  const btEntrar = () => {
    setOpenDialog(true)
    const token = getCookie("_token_GSI")

    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        password,
        chapa
      })
    }

    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/authentication/`, params)
      .then(response => {
        const { status } = response
        response.json().then(data => {
          setOpenDialog(false)
          if (status === 401) {
            setMessage(data.message)
            setOpenMessageDialog(true)
          } else if (status === 200) {
            // alert(data.token);
            document.cookie = `_token_GSI=${data.token}`;
            window.location.href = `${process.env.REACT_APP_DOMAIN}/home`;
            // alert('logado')
          }
        })
      })
  }

  const onSave = () => {
    // alert('1')


    if (fkPerfil == '2' || fkPerfil === '20') {
      if (senha.length >= 4) {
        setOpenLoadingDialog(true)
        const token = getCookie("_token_GSI")
        const params = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            nome,
            senha,
            chapa,
            fkPerfil,
            cpf
          })
        }

        fetch(`${process.env.REACT_APP_DOMAIN_API}/api/usuario/`, params)
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
                alert('Usuario Cadastrado')
                setOpenMessageDialog(true)
                window.location.href = `${process.env.REACT_APP_DOMAIN}/login`;
                // setArea(data.data)
              }
            }).catch(err => setOpenLoadingDialog(true))
          })

      } else {
        alert('Senha deve ter no minimo 4 caracteres')
      }

    } else {
      alert('codico de perfil nao existe')
    }

  }




  useEffect(() => {
    // carregarPerfis()

    // if(funcionarioChecado.length > 0){
    //   alert(JSON.stringify(funcionarioChecado[0].NOME))
    // }



  }, [perfis, funcionarioChecado]);


  const checkChapa = () => {

    setOpenLoadingDialog(true)
    const token = getCookie("_token_GSI")
    const params = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/usuario/recuperarFuncionario/${cpf}`, params)
      .then(response => {
        const { status } = response
        response.json().then(data => {
          setOpenDialog(false)
          if (status === 401) {

            alert(data.message)
            setOpenLoadingDialog(false)
          } else if (status === 200) {
            // alert(JSON.stringify(data.data))
            // setChapa(data.data.chapa)


            if (data.data.password) {

              alert('Senha: ' + data.data.password)
            } else {
              alert('CPF não encontrado ')
            }


            // setNome(data.data.AlunoNome)
            // salvardadosMigrados()




            setOpenLoadingDialog(false)

          }
        })
      })
  }

  const check = () => {

    setOpenLoadingDialog(true)
    const token = getCookie("_token_GSI")
    const params = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/usuario/checkFuncionario/${cpf}`, params)
      .then(response => {
        const { status } = response
        response.json().then(data => {
          setOpenDialog(false)
          if (status === 401) {

            alert(data.message)
            setOpenLoadingDialog(false)
          } else if (status === 200) {
            setFuncionarioChecado(data.data)

            alert(data.message)


            // setNome(data.data.AlunoNome)
            // salvardadosMigrados()




            setOpenLoadingDialog(false)

          }
        })
      })
  }

  useEffect(() => {


    if (funcionarioChecado.length > 0) {
      // alert( 'o')
      setNome(funcionarioChecado[0].NOME);
      const chapaCompleta = funcionarioChecado[0].CHAPA;
      const chapaSemIfem = chapaCompleta.split('-')[0];
      setChapa(chapaSemIfem);

      // setCep(alunoChecado[0][0].AlunoCepLogradouroPrincipal);

    }


  }, [funcionarioChecado, nome, funcionarioAlterado]);

  const checkCPF = () => {

    const camposObrigatorios = ['cpf'];
    if (!isValidCPF(cpf)) {
      alert('CPF  Inválido')
      setOpenLoadingDialog(false)
      return;
    } else {
      check();

    }

  };

  function isValidCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
      return false;
    }

    // Verifica se todos os dígitos são iguais (ex: 000.000.000-00)
    if (/^(\d)\1+$/.test(cpf)) {
      return false;
    }

    // Validação dos dígitos verificadores
    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf[i - 1]) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === parseInt(cpf[9])) {
      sum = 0;
      for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf[i - 1]) * (12 - i);
      }
      remainder = (sum * 10) % 11;
      return remainder === 10 || remainder === parseInt(cpf[10]);
    }

    return false;
  }

  const onAlterarSenha = () => {


    const token = getCookie("_token_GSI")
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        chapa, senha
      })

    }

    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/usuario/${chapa}/edit`, params)
      .then(response => {

        const { status } = response
        response.json().then(data => {
          setOpenLoadingDialog(false)
          if (status === 401) {

            setOpenMessageDialog(true)
          } else if (status === 200) {
            setFuncionarioAlterado(data.data)
            alert(data.message)
            window.location.reload()

          }
          //  window.location.href = `${process.env.REACT_APP_DOMAIN}/homeSindicatos`
        }).catch(err => setOpenLoadingDialog(true))
      })
  }





  function carregarPerfis() {

    const token = getCookie("_token_GSI")
    const params = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }

    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/perfil/`, params)
      .then(response => {

        const { status } = response

        response.json().then(data => {

          if (status === 401) {
          } else if (status === 200) {
            setPerfis(data.data)

          }
        })
      })
  }

  if (autenticated) {
    window.location.href = `${process.env.REACT_APP_DOMAIN}/home`;
  }

  if (!verified || autenticated) {
    return (
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${ImageBackground})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <img src={ImageLogo} height={64} />
            <Typography component="h1" variant="h5" style={{ marginTop: 16 }}>
              {process.env.REACT_APP_NAME}
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="Chapa"
                label="Chapa"
                name="Chapa"
                autoComplete="Chapa"
                autoFocus
                onChange={e => setChapa(e.target.value)}
              />


              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lembrar Acesso"
              /> */}

              <Button

                sx={{ mt: 3, mb: 2 }}
                onClick={() => setModalCadastro(true)}
              >
                Cadastrar Novo
              </Button>

              <Button

                style={{ marginLeft: '25px' }}
                sx={{ mt: 3, mb: 2 }}
                onClick={() => setModalRecuperar(true)}
              >
                Esqueceu a Senha
              </Button>




              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={btEntrar}
              >
                Entrar
              </Button>
              <div style={{ marginTop: 16, display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ color: 'rgb(117, 117, 117)', fontSize: 11 }}>@2024</div>
              </div>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Dialog open={openDialog}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 200, height: 120 }}>
          <CircularProgress />
        </div>
      </Dialog>


      <Dialog open={modalRecuperar} style={{ size: '350px' }} >
        <DialogTitle>Recuperar Senha</DialogTitle>
        <DialogContent>
          <DialogContentText>

          </DialogContentText>



          {funcionarioChecado.length <= 0 ?

            <div>
              Informe seu cpf
              <TextField

                autoFocus
                margin="dense"
                id="Nome"
                // label="Titulo do chamado"
                type="text"
                name="Informe a Chapa"
                fullWidth
                variant="standard"
                value={cpf}
                onChange={e => setCpf(e.target.value)}

              /><p></p>
              <Button onClick={checkChapa}>Buscar</Button>

            </div>

            :
            <div>


              <p></p>

              <FormControl fullWidth size="small">
                <InputLabel id="demo-select-small">Chapa</InputLabel>
                <hr></hr>
                <TextField
                  autoFocus
                  margin="dense"
                  id="chapa"
                  // label="Descrição do chamado"
                  type="text"
                  name="Chapa"
                  fullWidth
                  disabled
                  multiline
                  value={chapa}
                  onChange={e => setChapa(e.target.value)}

                />

              </FormControl>


              <p></p>

              <TextField
                autoFocus
                margin="dense"
                id="senha"
                type="password" // Alterado para "password" para ocultar os caracteres digitados
                name="Senha"
                fullWidth
                variant="standard"
                multiline
                value={senha}
                onChange={e => setSenha(e.target.value)}
                error={senha.length < 4} // Define o campo como erro se a senha tiver menos de 4 caracteres
                helperText={senha.length < 4 ? "A senha deve ter pelo menos 4 caracteres" : ""} // Exibe mensagem de erro se a senha tiver menos de 4 caracteres
              />

            </div>

          }

          <p></p>

        </DialogContent>
        {chapa && senha ?

          <Button onClick={onAlterarSenha}>Salvar</Button>
          :
          ''}
        <Button onClick={() => setModalRecuperar(false)}>Cancelar</Button>
      </Dialog>




      <Dialog open={modalCadastro} style={{ size: '350px' }} >
        <DialogTitle>Novo Usuario</DialogTitle>
        <DialogContent>
          <DialogContentText>

          </DialogContentText>



          {funcionarioChecado.length === 0 ?

            <div>
              Informe o CPF
              <TextField

                autoFocus
                margin="dense"
                id="Nome"
                // label="Titulo do chamado"
                type="text"
                name="Informe CPF"
                fullWidth
                variant="standard"
                value={cpf}
                onChange={e => setCpf(e.target.value)}

              /><p></p>
              <Button onClick={checkCPF}>Buscar</Button>

            </div>

            :
            <div>

              <FormControl fullWidth size="small">
                <InputLabel id="demo-select-small">Nome</InputLabel>
                <hr></hr>
                <TextField

                  autoFocus
                  margin="dense"
                  id="Nome"
                  // label="Titulo do chamado"
                  type="text"
                  name="Nome"
                  fullWidth
                  disabled
                  value={nome}
                  onChange={e => setNome(e.target.value)}

                />

              </FormControl>


              <p></p>

              <FormControl fullWidth size="small">
                <InputLabel id="demo-select-small">Chapa</InputLabel>
                <hr></hr>
                <TextField
                  autoFocus
                  margin="dense"
                  id="chapa"
                  // label="Descrição do chamado"
                  type="text"
                  name="Chapa"
                  fullWidth
                  disabled
                  multiline
                  value={chapa}
                  onChange={e => setChapa(e.target.value)}

                />

              </FormControl>


              <FormControl fullWidth size="small">
                <InputLabel id="demo-select-small">Codigo do perfil</InputLabel>
                <hr></hr>
                <TextField
                  autoFocus
                  margin="dense"
                  id="Codigo do perfil"
                  // label="Descrição do chamado"
                  type="text"
                  name="Codigo do perfil"
                  fullWidth

                  multiline
                  value={fkPerfil}
                  onChange={e => setFkPerfil(e.target.value)}

                />

              </FormControl>

              {/* <FormControl fullWidth>
                <InputLabel htmlFor="demo-select-small">Perfil*</InputLabel>
                <Select
                  size="small"
                  fullWidth

                  labelId="demo-select-small"
                  id="demo-select-small"
                  label="Perfil"
                  value={fkPerfil}

                >

                  <MenuItem  value={'Usuario'} onClick={() => setFkPerfil('Usuario')}>Usuario</MenuItem>
                  <MenuItem  value={'Usuario'} onClick={() => setFkPerfil('Usuario')}>Usuario</MenuItem>
                </Select>
              </FormControl> */}

              <p></p>

              <FormControl fullWidth size="small">
                <InputLabel id="demo-select-small">Senha</InputLabel>
                <hr></hr>
                <TextField
                  autoFocus
                  margin="dense"
                  id="senha"
                  type="password" // Alterado para "password" para ocultar os caracteres digitados
                  name="Senha"
                  fullWidth
                  variant="standard"
                  multiline
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  error={senha.length < 4} // Define o campo como erro se a senha tiver menos de 4 caracteres
                  helperText={senha.length < 4 ? "A senha deve ter pelo menos 4 caracteres" : ""} // Exibe mensagem de erro se a senha tiver menos de 4 caracteres
                />
              </FormControl>


            </div>


          }




          <p></p>



        </DialogContent>
        {senha && fkPerfil && chapa && nome ?


          <Button onClick={onSave}>Salvar</Button>

          :
          ''}

        <Button onClick={() => setModalCadastro(false)}>Cancelar</Button>
      </Dialog>






      <Dialog
        open={openMessageDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          Atenção
        </DialogTitle>
        <DialogContent style={{ width: 400 }}>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMessageDialog}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}

export default Login
