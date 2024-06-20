"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _localmodel = require('../model/local.model'); var _localmodel2 = _interopRequireDefault(_localmodel);
var _produtomodel = require('../model/produto.model'); var _produtomodel2 = _interopRequireDefault(_produtomodel);
var _pedidomodel = require('../model/pedido.model'); var _pedidomodel2 = _interopRequireDefault(_pedidomodel);
var _usuariomodel = require('../model/usuario.model'); var _usuariomodel2 = _interopRequireDefault(_usuariomodel);
const { Op } = require('sequelize');

class LocalController  {
  async all(req, res, next) {
    try {
      const registros = await _localmodel2.default.findAll({ order: [['nome', 'asc']] })


      res.status(200).json({ data: registros })
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async create(req, res, next) {
    try {
      // const { id } = req.params

      const {
        fkUnidade,
        nomeAmbiente
      } = req.body


      const registro = await _localmodel2.default.create({
        nome: nomeAmbiente,
        fkUnidade

      });

      res.status(200).json({ data: registro, message: 'Ambiente Cadastrado.' })

    } catch (err) {
      console.log(err)
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async find(req, res, next) {
    try {
      const { id } = req.params
      console.log('cvf' + id)

      const registro = await _localmodel2.default.findAll({ where: { fkUnidade: id } })

      res.status(200).json({ data: registro })
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async update(req, res, next) {
    throw new Error('Method not implemented.')
  }

  async delete(req, res, next) {
    throw new Error('Method not implemented.')
  }

  async search(req, res, next) {
    try {
      const { pesquisa } = req.query

      const registros = await _localmodel2.default.findAll({

        where: {
          fkUnidade: pesquisa,
        },
        order: [['nome', 'ASC']]
      });
      console.log(JSON.stringify(registros))

      res.status(200).json({ data: registros })
    } catch (err) {
      console.log(err)
      if (typeof err.errors !== 'undefined') {
        res.status(401).json({ message: err.errors[0].message })
      } else if (typeof err.message !== 'undefined') {
        res.status(401).json({ message: err.message })
      } else {
        res.status(401).json({ message: 'Aconteceu um erro no processamento da requisição, por favor tente novamente.' })
      }
    }
  }

  async searchRelatorio(req, res, next) {
    try {
      const { pesquisa } = req.query
      // console.log(JSON.stringify('papai'+pesquisa))


      // const local = await Local.findOne({
      //   where: { nome: pesquisa },
      // });

      const registros = await _pedidomodel2.default.findAll({
        include: [_produtomodel2.default, _localmodel2.default, _usuariomodel2.default],
        where: {
          fkLocal: pesquisa,
          // status: 'Entregue'
        },
        order: [
          ['dataRetirada', 'DESC'] // Ordena os registros em ordem decrescente de dataRetirada (da mais recente para a mais antiga)
        ]
      });
      console.log(JSON.stringify(registros))

      res.status(200).json({ data: registros })
    } catch (err) {
      console.log(err)
      if (typeof err.errors !== 'undefined') {
        res.status(401).json({ message: err.errors[0].message })
      } else if (typeof err.message !== 'undefined') {
        res.status(401).json({ message: err.message })
      } else {
        res.status(401).json({ message: 'Aconteceu um erro no processamento da requisição, por favor tente novamente.' })
      }
    }
  }


  async searchPorLocal(req, res, next) {
    try {
      const { pesquisa, dataInicio, dataFim } = req.query

    
      const dataFimFinal = new Date(dataFim);
      dataFimFinal.setHours(23, 59, 59);

      const dataInicial = new Date(dataInicio);
      dataInicial.setHours(1, 0, 0);





      const registros = await _pedidomodel2.default.findAll({
        include: [_usuariomodel2.default, _produtomodel2.default, _localmodel2.default],
        where: {
          dataRetirada: {
            [Op.between]: [dataInicial, dataFimFinal],

          },
          fkLocal: pesquisa
        },
        order: [
          ['dataRetirada', 'DESC'] // Ordena os registros em ordem decrescente de dataRetirada (da mais recente para a mais antiga)
        ]
      });



      console.log('chii' + JSON.stringify(registros))

      res.status(200).json({ data: registros })
    } catch (err) {
      console.log(err)
      if (typeof err.errors !== 'undefined') {
        res.status(401).json({ message: err.errors[0].message })
      } else if (typeof err.message !== 'undefined') {
        res.status(401).json({ message: err.message })
      } else {
        res.status(401).json({ message: 'Aconteceu um erro no processamento da requisição, por favor tente novamente.' })
      }
    }
  }

}

exports. default = new LocalController()
