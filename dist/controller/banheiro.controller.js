"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _banheiromodel = require('../model/banheiro.model'); var _banheiromodel2 = _interopRequireDefault(_banheiromodel);

class BanheiroController  {
  async all (req, res, next) {
    try {
      const registros = await _banheiromodel2.default.findAll()

      res.status(200).json({ data: registros })
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  
  async create(req, res, next) {
    try {
      // const { id } = req.params

      const {
        fkLocal,
        nomeBanheiro,
        codigoBanheiro

      } = req.body


      const registro = await _banheiromodel2.default.create({
        codigo:codigoBanheiro,
        fkLocal,
        descricao:nomeBanheiro

      });

      res.status(200).json({ data: registro, message: 'Ambiente Cadastrado.' })

    } catch (err) {
      console.log(err)
      res.status(401).json({ message: err.errors[0].message })
    }
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

exports. default = new BanheiroController()
