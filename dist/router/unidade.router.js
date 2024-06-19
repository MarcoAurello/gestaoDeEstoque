"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _unidadecontroller = require('../controller/unidade.controller'); var _unidadecontroller2 = _interopRequireDefault(_unidadecontroller);
var _express = require('express');




class UnidadeRouter {
  

  constructor () {
    this.router = _express.Router.call(void 0, )
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


   routers () {
    this.router.get('/search/', _unidadecontroller2.default.search)
    this.router.get('/', _unidadecontroller2.default.all)
    this.router.post('/',_unidadecontroller2.default.create)
    this.router.get('/:id', _unidadecontroller2.default.find)
    this.router.post('/:id/edit',  _unidadecontroller2.default.update)
    this.router.post('/:id/delete', _unidadecontroller2.default.delete)
  }
}

exports. default = new UnidadeRouter().router
