"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _produtocontroller = require('../controller/produto.controller'); var _produtocontroller2 = _interopRequireDefault(_produtocontroller);
var _express = require('express');



class ProdutoRouter {
  

  constructor () {
    this.router = _express.Router.call(void 0, )
    // this.router.use(routerMiddleware.authenticated)
    this.routers()
  }

   routers () {
    this.router.get('/search/', _produtocontroller2.default.search)
    this.router.get('/', _produtocontroller2.default.all)
    this.router.post('/', _produtocontroller2.default.create)
    this.router.get('/:id', _produtocontroller2.default.find)
    this.router.post('/:id/edit', _produtocontroller2.default.update)
    this.router.post('/:id/editEstoque', _produtocontroller2.default.updateEstoque)
    this.router.post('/:id/delete', _produtocontroller2.default.delete)
  }
}

exports. default = new ProdutoRouter().router
