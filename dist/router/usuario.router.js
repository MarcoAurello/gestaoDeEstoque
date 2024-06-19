"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _usuariocontroller = require('../controller/usuario.controller'); var _usuariocontroller2 = _interopRequireDefault(_usuariocontroller);
var _express = require('express');




class UsuarioRouter {
  

  constructor () {
    this.router = _express.Router.call(void 0, )
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


   routers () {
    this.router.get('/naovalidado/', _usuariocontroller2.default.naoValidado)
    this.router.get('/equipe/', _usuariocontroller2.default.equipe)
    this.router.get('/search/', _usuariocontroller2.default.search)
    this.router.get('/searchCPF/', _usuariocontroller2.default.searchCPF)
    this.router.get('/searchRelatorio/', _usuariocontroller2.default.searchRelatorio)

    
    this.router.get('/',  _usuariocontroller2.default.all)
    this.router.post('/', _usuariocontroller2.default.create)
    this.router.get('/:id',  _usuariocontroller2.default.find)
    this.router.get("/checkFuncionario/:id", _usuariocontroller2.default.checkFuncionario)
    this.router.get("/recuperarFuncionario/:id", _usuariocontroller2.default.recuperarFuncionario)
    this.router.post('/:id/edit', _usuariocontroller2.default.update)
    this.router.post('/:id/validar', _usuariocontroller2.default.validar)
    this.router.post('/edit/primeiroacesso/', _usuariocontroller2.default.updatePrimeiroAcesso)
    this.router.post('/:id/delete', _usuariocontroller2.default.delete)
  }
}

exports. default = new UsuarioRouter().router
