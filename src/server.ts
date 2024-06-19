import express, { json } from 'express'
import cors from 'cors'
import monitor from 'express-status-monitor';
import routerStatusApplication from './router/statusapplicatoin.router'
import routerAuthentication from './router/authentication.router'
import routerUsuario from './router/usuario.router'
import routerUnidade from './router/unidade.router'
import routerLocal from './router/local.router'
import routerProduto from './router/produto.router'
import routerEntrada from './router/entrada.router'
import routerPedido from './router/pedido.router'
import routerBanheiro from './router/banheiro.router'
import routerLimpezaBanheiro from './router/limpezaBanheiro.router'
import routerArquivo from './router/arquivo.router'



import routerPerfil from './router/perfil.router'
import routerConfiguracaoGlobal from './router/configuracaoGlobal.router'
import protocolo from './utils/protocolo.utils'

import fileUpload from 'express-fileupload';

const path = require('path')

class Server {
  public application!: express.Application

  constructor () {
    console.log(protocolo())
    this.application = express()
    this.middlewares()
    this.routers()
  }

  private middlewares () {
    this.application.use(json())
    this.application.use(cors())
    this.application.use(
      fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
      })
    );
    this.application.use(monitor());
  }

  private routers () {
    this.application.use('/api/statusapplication/', routerStatusApplication)
    this.application.use('/api/authentication/', routerAuthentication)
    this.application.use('/api/perfil/', routerPerfil)
    this.application.use('/api/usuario/', routerUsuario)
    this.application.use('/api/unidade/', routerUnidade)
    this.application.use('/api/local/', routerLocal)
    this.application.use('/api/produto/', routerProduto)
    this.application.use('/api/arquivo/', routerArquivo)
    this.application.use('/api/entrada/', routerEntrada)
    this.application.use('/api/pedido/', routerPedido)
    this.application.use('/api/banheiro/', routerBanheiro)
    this.application.use('/api/limpezaBanheiro/', routerLimpezaBanheiro)
    this.application.use('/api/configuracao/', routerConfiguracaoGlobal)
    this.application.use(express.static(path.resolve('app', 'build')))
    this.application.get('/*', (req, res) =>
      res.sendFile(path.resolve('app', 'build', 'index.html'))
    )
  }
}

export default new Server().application
