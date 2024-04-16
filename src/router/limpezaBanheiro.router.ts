import controller from '../controller/limpezaBanheiro.controller'
import { Router } from 'express'

import routerMiddleware from '../middleware/router.middleware'
import PerfilUtils from '../utils/perfil.utils'

class LimpezaBanheiroRouter {
  public router!: Router

  constructor () {
    this.router = Router()
    // this.router.use(routerMiddleware.authenticated)
    this.routers()
  }

  // private routers () {
  //   this.router.get('/search/', controller.search)
  //   this.router.get('/', controller.all)
  //   this.router.post('/', routerMiddleware.role([PerfilUtils.Administrador]), controller.create)
  //   this.router.get('/:id', controller.find)
  //   this.router.post('/:id/edit', routerMiddleware.role([PerfilUtils.Administrador]), controller.update)
  //   this.router.post('/:id/delete', routerMiddleware.role([PerfilUtils.Administrador]), controller.delete)
  // }


  private routers () {
    this.router.get('/search/', controller.search)
    this.router.get('/', controller.all)
    this.router.post('/',controller.create)
    this.router.get('/:id', controller.find)
    this.router.post('/:id/edit',  controller.update)
    this.router.post('/:id/delete', controller.delete)
  }
}

export default new LimpezaBanheiroRouter().router
