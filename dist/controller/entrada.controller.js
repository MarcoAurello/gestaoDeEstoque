"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _entradamodel = require('../model/entrada.model'); var _entradamodel2 = _interopRequireDefault(_entradamodel);

class EntradaController  {
  async all (req, res, next) {
    try {
      const registros = await _entradamodel2.default.findAll()

      res.status(200).json({ data: registros })
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async create (req, res, next) {
    throw new Error('Method not implemented.')
  }

  async find (req, res, next) {
    throw new Error('Method not implemented.')
  }

  async update (req, res, next) {
    throw new Error('Method not implemented.')
  }

  async delete (req, res, next) {
    throw new Error('Method not implemented.')
  }

  async search (req, res, next) {
    throw new Error('Method not implemented.')
  }
}

exports. default = new EntradaController()
