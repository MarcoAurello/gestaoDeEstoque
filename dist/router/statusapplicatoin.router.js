"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _statusapplicationcontroller = require('../controller/statusapplication.controller'); var _statusapplicationcontroller2 = _interopRequireDefault(_statusapplicationcontroller);
var _express = require('express');

class StatusApplicationRouter {
  

  constructor () {
    this.router = _express.Router.call(void 0, )
    this.routers()
  }

   routers () {
    this.router.get('/', _statusapplicationcontroller2.default.all)
  }
}

exports. default = new StatusApplicationRouter().router
