"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _banheirocontroller = require('../controller/banheiro.controller'); var _banheirocontroller2 = _interopRequireDefault(_banheirocontroller);
var _express = require('express');




class BanheiroRouter {
  

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
    this.router.get('/search/', _banheirocontroller2.default.search)
    this.router.get('/', _banheirocontroller2.default.all)
    this.router.post('/',_banheirocontroller2.default.create)
    this.router.get('/:id', _banheirocontroller2.default.find)
    this.router.post('/:id/edit',  _banheirocontroller2.default.update)
    this.router.post('/:id/delete', _banheirocontroller2.default.delete)
  }
}

exports. default = new BanheiroRouter().router
