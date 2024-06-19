"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _pedidomodel = require('../model/pedido.model'); var _pedidomodel2 = _interopRequireDefault(_pedidomodel);
var _produtomodel = require('../model/produto.model'); var _produtomodel2 = _interopRequireDefault(_produtomodel);
var _localmodel = require('../model/local.model'); var _localmodel2 = _interopRequireDefault(_localmodel);

var _usuariomodel = require('../model/usuario.model'); var _usuariomodel2 = _interopRequireDefault(_usuariomodel);
const { Op } = require('sequelize');

class PedidoController  {
  async all (req, res, next) {
    try {
      const registros = await _pedidomodel2.default.findAll(
        {include: [ _produtomodel2.default , _localmodel2.default, _usuariomodel2.default]
        }
      )

      console.log(JSON.stringify('xx2'+JSON.stringify(registros)))

      res.status(200).json({ data: registros })
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async create (req, res, next) {
    try {
      // const { id } = req.params
     
      const {
        fkLocal,
        fkPoduto,
        fkUsuario,
        quantidade,
        id
      } = req.body
      // console.log('qqqqqq'+senha)

      console.log('lulu'+ fkPoduto)

      // const registro = await Usuario.create({
      //   nome,
      //   chapa,
      //   senha
    

      // });

      let registro = []

      if(id){
        const user = await _usuariomodel2.default.findOne({ where: { cpf: id } })
         
        registro = await _pedidomodel2.default.create({
          quantidadeRetirada : quantidade,
          status:"não retirado",
          fkSolicitante: _optionalChain([user, 'optionalAccess', _ => _.id]),
          fkLocal,
          fkProduto:fkPoduto
         
        });

      }else{

         registro = await _pedidomodel2.default.create({
          quantidadeRetirada : quantidade,
          status:"não retirado",
          fkSolicitante: fkUsuario,
          fkLocal,
          fkProduto:fkPoduto
         
        });


      }

      
       
  
        res.status(200).json({ data: registro, message: 'Produto solicitado.' })

    } catch (err) {
      console.log(err)
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async find (req, res, next) {
    try {
      const { id } = req.params
      console.log(id)
    

      const registro = await _pedidomodel2.default.findAll({ 
        include: [ _produtomodel2.default , _localmodel2.default],
        where: { 
          fkSolicitante: id,
          Status:'não retirado'
        },
      
      });
      console.log(JSON.stringify('xx1'+JSON.stringify(registro)))

      res.status(200).json({ data: registro })
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async findAlter (req, res, next) {
    try {
      const { id } = req.params
      console.log(id)
    

      const registro = await _pedidomodel2.default.findOne({ 
        include: [ _produtomodel2.default , _localmodel2.default],
        where: { 
         id,
          
        },
      
      });
      console.log(JSON.stringify('xx1'+JSON.stringify(registro)))

      res.status(200).json({ data: registro })
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message })
    }
  }


  async update (req, res, next) {
    try {
      const { id } = req.params;
      const { quantidade } = req.body;
  
      await _pedidomodel2.default.update({
        quantidade
  
      
      }, {
        where: {
          id
        },
        individualHooks: false
      })
      
  
      res.status(200).json({ data: null, message: 'pedido Alterado.' });
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message });
    }
  }
  
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      
      // console.log('2222')

      await _pedidomodel2.default.destroy({
        where: {
          id
        },
        individualHooks: true,
      });

      res.status(200).json({ data: null, message: 'Excluído com sucesso.' });
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message });
    }
  }


  
  async search (req, res, next) {
    try {
      const { pesquisa } = req.query
   

      const registros = await _pedidomodel2.default.findAll({
        include: [
          {
            model: _usuariomodel2.default,
            where: {
              nome: {
                [Op.like]: `%${pesquisa}%`
              }
            }
          },
          {
            model: _localmodel2.default
          },
          {
            model: _produtomodel2.default
          }
        ],
        where: {
          status:  'não retirado' 
          
        }
      })

      

  

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
}

exports. default = new PedidoController()
