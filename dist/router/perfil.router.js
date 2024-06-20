"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _perfilcontroller = require('../controller/perfil.controller'); var _perfilcontroller2 = _interopRequireDefault(_perfilcontroller);
var _express = require('express');



class PerfilRouter {
  

  constructor () {
    this.router = _express.Router.call(void 0, )
    // this.router.use(routerMiddleware.authenticated)
    this.routers()
  }

   routers () {
    this.router.get('/search/', _perfilcontroller2.default.search)
    this.router.get('/', _perfilcontroller2.default.all)
    this.router.post('/', _perfilcontroller2.default.create)
    this.router.get('/:id', _perfilcontroller2.default.find)
    this.router.post('/:id/edit', _perfilcontroller2.default.update)
    this.router.post('/:id/delete', _perfilcontroller2.default.delete)
  }
}

exports. default = new PerfilRouter().router
