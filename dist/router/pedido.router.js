"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _pedidocontroller = require('../controller/pedido.controller'); var _pedidocontroller2 = _interopRequireDefault(_pedidocontroller);
var _express = require('express');



class PedidoRouter {
  

  constructor () {
    this.router = _express.Router.call(void 0, )
    // this.router.use(routerMiddleware.authenticated)
    this.routers()
  }

   routers () {
    this.router.get('/search/', _pedidocontroller2.default.search)
    this.router.get('/', _pedidocontroller2.default.all)
    this.router.get('/porProduto', _pedidocontroller2.default.porProduto)
    this.router.get('/porFuncionario', _pedidocontroller2.default.porFuncionario)
    this.router.get('/porLocal', _pedidocontroller2.default.porLocal)
    this.router.post('/', _pedidocontroller2.default.create)
    this.router.get('/:id', _pedidocontroller2.default.find)
    this.router.get('/alter/:id', _pedidocontroller2.default.findAlter)
    this.router.post('/:id/edit', _pedidocontroller2.default.update)
    this.router.post('/:id/delete', _pedidocontroller2.default.delete)
  }
}



exports. default = new PedidoRouter().router
