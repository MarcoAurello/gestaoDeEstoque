"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _entradacontroller = require('../controller/entrada.controller'); var _entradacontroller2 = _interopRequireDefault(_entradacontroller);
var _express = require('express');



class EntradaRouter {
  

  constructor () {
    this.router = _express.Router.call(void 0, )
    // this.router.use(routerMiddleware.authenticated)
    this.routers()
  }

   routers () {
    this.router.get('/search/', _entradacontroller2.default.search)
    this.router.get('/', _entradacontroller2.default.all)
    this.router.post('/', _entradacontroller2.default.create)
    this.router.get('/:id', _entradacontroller2.default.find)
    this.router.post('/:id/edit', _entradacontroller2.default.update)
    this.router.post('/:id/delete', _entradacontroller2.default.delete)
  }
}

exports. default = new EntradaRouter().router
