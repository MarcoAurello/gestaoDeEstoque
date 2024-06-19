"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable n/handle-callback-err */


var _usuariomodel = require('../model/usuario.model'); var _usuariomodel2 = _interopRequireDefault(_usuariomodel);
var _configuracaoGeralmodel = require('../model/configuracaoGeral.model'); var _configuracaoGeralmodel2 = _interopRequireDefault(_configuracaoGeralmodel);
var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);

class AuthenticationController {
  async login (req, res, next) {
    try {
      const { chapa, password } = req.body

      const configuracao = await _configuracaoGeralmodel2.default.findOne()
    

      // const ad = new ActivityDirectory(config)

      if (!chapa) {
        return res.status(401).json({ message: 'O campo chapa deve ser preenchido corretamente.' })
      }

      if (!password) {
        return res.status(401).json({ message: 'O campo senha deve ser preenchido corretamente.' })
      }
 
        const registro = await _usuariomodel2.default.findOne({ where: { chapa} })

        if (!registro) {
          return res.status(401).json({ message: 'Não foi possível localizar o usuário.' })
        }

        if (!await _bcrypt2.default.compare(password, registro.passwordHash)) {
          return res.status(401).json({ message: 'Senha inválida.' })
        }

        const token = registro.generateToken();
        console.log(token);
        return res.status(200).json({ message: 'Usuário validado com sucesso.', token })
      
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: 'Login ou senha inválidos.' })
    }
  }

  

  async logged (req, res, next) {
    try {
      res.status(200).json({ data: req.usuario })
    } catch (err) {
      return res.status(401).json({ message: err.errors[0].message })
    }
  }
}

exports. default = new AuthenticationController()
