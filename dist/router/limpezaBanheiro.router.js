"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _limpezaBanheirocontroller = require('../controller/limpezaBanheiro.controller'); var _limpezaBanheirocontroller2 = _interopRequireDefault(_limpezaBanheirocontroller);
var _express = require('express');




class LimpezaBanheiroRouter {
  

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
    this.router.get('/search/', _limpezaBanheirocontroller2.default.search)
    this.router.get('/', _limpezaBanheirocontroller2.default.all)
    this.router.post('/',_limpezaBanheirocontroller2.default.create)
    this.router.get('/:id', _limpezaBanheirocontroller2.default.find)
    this.router.post('/:id/edit',  _limpezaBanheirocontroller2.default.update)
    this.router.post('/:id/editAdm',  _limpezaBanheirocontroller2.default.updateAdm)
    this.router.post('/:id/delete', _limpezaBanheirocontroller2.default.delete)
  }
}

exports. default = new LimpezaBanheiroRouter().router
