"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _localcontroller = require('../controller/local.controller'); var _localcontroller2 = _interopRequireDefault(_localcontroller);
var _express = require('express');



class LocalRouter {
  

  constructor () {
    this.router = _express.Router.call(void 0, )
    // this.router.use(routerMiddleware.authenticated)
    this.routers()
  }

   routers () {
    this.router.get('/search/', _localcontroller2.default.search)
    this.router.get('/searchRelatorio/', _localcontroller2.default.searchRelatorio)
    this.router.get('/', _localcontroller2.default.all)
    this.router.get('/searchPorLocal/', _localcontroller2.default.searchPorLocal)
    this.router.post('/', _localcontroller2.default.create)
    this.router.get('/:id', _localcontroller2.default.find)
    this.router.post('/:id/edit', _localcontroller2.default.update)
    this.router.post('/:id/delete', _localcontroller2.default.delete)
  }
}



exports. default = new LocalRouter().router
