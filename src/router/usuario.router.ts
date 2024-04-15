import controller from '../controller/usuario.controller'
import { Router } from 'express'

import routerMiddleware from '../middleware/router.middleware'
import PerfilUtils from '../utils/perfil.utils'

class UsuarioRouter {
  public router!: Router

  constructor () {
    this.router = Router()
    // this.router.use(routerMiddleware.authenticated)
    this.routers()
  }

  // private routers () {
  //   this.router.get('/naovalidado/', controller.naoValidado)
  //   this.router.get('/equipe/', controller.equipe)
  //   this.router.get('/search/', controller.search)
  //   this.router.get('/',  controller.all)
  //   this.router.post('/', controller.create)
  //   this.router.get('/:id', routerMiddleware.role([PerfilUtils.Administrador, PerfilUtils.Gerente]), controller.find)
  //   this.router.post('/:id/edit', routerMiddleware.role([PerfilUtils.Administrador]), controller.update)
  //   this.router.post('/:id/validar', routerMiddleware.role([PerfilUtils.Administrador, PerfilUtils.Gerente]), controller.validar)
  //   this.router.post('/edit/primeiroacesso/', controller.updatePrimeiroAcesso)
  //   this.router.post('/:id/delete', controller.delete)
  // }


  private routers () {
    this.router.get('/naovalidado/', controller.naoValidado)
    this.router.get('/equipe/', controller.equipe)
    this.router.get('/search/', controller.search)
    this.router.get('/searchCPF/', controller.searchCPF)
    this.router.get('/searchRelatorio/', controller.searchRelatorio)

    
    this.router.get('/',  controller.all)
    this.router.post('/', controller.create)
    this.router.get('/:id',  controller.find)
    this.router.get("/checkFuncionario/:id", controller.checkFuncionario)
    this.router.get("/recuperarFuncionario/:id", controller.recuperarFuncionario)
    this.router.post('/:id/edit', controller.update)
    this.router.post('/:id/validar', controller.validar)
    this.router.post('/edit/primeiroacesso/', controller.updatePrimeiroAcesso)
    this.router.post('/:id/delete', controller.delete)
  }
}

export default new UsuarioRouter().router
