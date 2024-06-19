"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _statusmodel = require('../model/status.model'); var _statusmodel2 = _interopRequireDefault(_statusmodel);
//import Chamado from '../models/chamado-model';

class StatusController  {
  async all(req, res, next) {
    try {
      const registros = await _statusmodel2.default.findAll(

        
      );

      res.status(200).json({ data: registros });
    } catch (err) {
      res.status(401).json({ data: null, mesage: err });
    }
  }

  async create(req, res, next) {
    try {
      const { descricao,} = req.body;

      const registro = await _statusmodel2.default.create({
        descricao
      });

      res
        .status(200)
        .json({ data: registro, message: "Chamado cadastrado com sucesso. " });
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message });
    }
  }

  async find(req, res, next) {
    try {
      const { id } = req.params;

      const registro = await _statusmodel2.default.findOne({
        where: {
          id,
        },
      });

      res.status(200).json({ data: registro });
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message });
    }
  }

  async update(req, res, next) {
    throw new Error("Method not implemented.");
  }

  async delete(req, res, next) {
    throw new Error("Method not implemented.");
  }

  async search(req, res, next) {
    throw new Error("Method not implemented.");
  }
}

exports. default = new StatusController();
