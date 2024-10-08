import controller from '../controller/pedido.controller'
import { Router } from 'express'

import routerMiddleware from '../middleware/router.middleware'

class PedidoRouter {
  public router!: Router

  constructor () {
    this.router = Router()
    // this.router.use(routerMiddleware.authenticated)
    this.routers()
  }

  private routers () {
    this.router.get('/search/', controller.search)
    this.router.get('/', controller.all)
    this.router.get('/porProduto', controller.porProduto)
    this.router.get('/porFuncionario', controller.porFuncionario)
    this.router.get('/porLocal', controller.porLocal)
    this.router.post('/', controller.create)
    this.router.get('/:id', controller.find)
    this.router.get('/alter/:id', controller.findAlter)
    this.router.post('/:id/edit', controller.update)
    this.router.post('/:id/delete', controller.delete)
  }
}



export default new PedidoRouter().router
