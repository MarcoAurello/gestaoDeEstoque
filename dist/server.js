"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _expressstatusmonitor = require('express-status-monitor'); var _expressstatusmonitor2 = _interopRequireDefault(_expressstatusmonitor);
var _statusapplicatoinrouter = require('./router/statusapplicatoin.router'); var _statusapplicatoinrouter2 = _interopRequireDefault(_statusapplicatoinrouter);
var _authenticationrouter = require('./router/authentication.router'); var _authenticationrouter2 = _interopRequireDefault(_authenticationrouter);
var _usuariorouter = require('./router/usuario.router'); var _usuariorouter2 = _interopRequireDefault(_usuariorouter);
var _unidaderouter = require('./router/unidade.router'); var _unidaderouter2 = _interopRequireDefault(_unidaderouter);
var _localrouter = require('./router/local.router'); var _localrouter2 = _interopRequireDefault(_localrouter);
var _produtorouter = require('./router/produto.router'); var _produtorouter2 = _interopRequireDefault(_produtorouter);
var _entradarouter = require('./router/entrada.router'); var _entradarouter2 = _interopRequireDefault(_entradarouter);
var _pedidorouter = require('./router/pedido.router'); var _pedidorouter2 = _interopRequireDefault(_pedidorouter);
var _banheirorouter = require('./router/banheiro.router'); var _banheirorouter2 = _interopRequireDefault(_banheirorouter);
var _limpezaBanheirorouter = require('./router/limpezaBanheiro.router'); var _limpezaBanheirorouter2 = _interopRequireDefault(_limpezaBanheirorouter);
var _arquivorouter = require('./router/arquivo.router'); var _arquivorouter2 = _interopRequireDefault(_arquivorouter);



var _perfilrouter = require('./router/perfil.router'); var _perfilrouter2 = _interopRequireDefault(_perfilrouter);
var _configuracaoGlobalrouter = require('./router/configuracaoGlobal.router'); var _configuracaoGlobalrouter2 = _interopRequireDefault(_configuracaoGlobalrouter);
var _protocoloutils = require('./utils/protocolo.utils'); var _protocoloutils2 = _interopRequireDefault(_protocoloutils);

var _expressfileupload = require('express-fileupload'); var _expressfileupload2 = _interopRequireDefault(_expressfileupload);

const path = require('path')

class Server {
  

  constructor () {
    console.log(_protocoloutils2.default.call(void 0, ))
    this.application = _express2.default.call(void 0, )
    this.middlewares()
    this.routers()
  }

   middlewares () {
    this.application.use(_express.json.call(void 0, ))
    this.application.use(_cors2.default.call(void 0, ))
    this.application.use(
      _expressfileupload2.default.call(void 0, {
        limits: { fileSize: 50 * 1024 * 1024 },
      })
    );
    this.application.use(_expressstatusmonitor2.default.call(void 0, ));
  }

   routers () {
    this.application.use('/api/statusapplication/', _statusapplicatoinrouter2.default)
    this.application.use('/api/authentication/', _authenticationrouter2.default)
    this.application.use('/api/perfil/', _perfilrouter2.default)
    this.application.use('/api/usuario/', _usuariorouter2.default)
    this.application.use('/api/unidade/', _unidaderouter2.default)
    this.application.use('/api/local/', _localrouter2.default)
    this.application.use('/api/produto/', _produtorouter2.default)
    this.application.use('/api/arquivo/', _arquivorouter2.default)
    this.application.use('/api/entrada/', _entradarouter2.default)
    this.application.use('/api/pedido/', _pedidorouter2.default)
    this.application.use('/api/banheiro/', _banheirorouter2.default)
    this.application.use('/api/limpezaBanheiro/', _limpezaBanheirorouter2.default)
    this.application.use('/api/configuracao/', _configuracaoGlobalrouter2.default)
    this.application.use(_express2.default.static(path.resolve('app', 'build')))
    this.application.get('/*', (req, res) =>
      res.sendFile(path.resolve('app', 'build', 'index.html'))
    )
  }
}

exports. default = new Server().application
