"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _produtomodel = require('../model/produto.model'); var _produtomodel2 = _interopRequireDefault(_produtomodel);
var _pedidomodel = require('../model/pedido.model'); var _pedidomodel2 = _interopRequireDefault(_pedidomodel);

var _entradamodel = require('../model/entrada.model'); var _entradamodel2 = _interopRequireDefault(_entradamodel);
var _usuariomodel = require('../model/usuario.model'); var _usuariomodel2 = _interopRequireDefault(_usuariomodel);
var _localmodel = require('../model/local.model'); var _localmodel2 = _interopRequireDefault(_localmodel);
const { Op } = require('sequelize');

class ProdutoController  {
  async all(req, res, next) {
    try {
      const registros = await _produtomodel2.default.findAll({
        order: [
          ['nome', 'ASC'] // Ordena os registros em ordem crescente pelo campo 'nome'
          // Ou use 'DESC' para ordem decrescente
        ]
      });
  
      res.status(200).json({ data: registros });
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: err.errors[0].message });
    }
  }
  async create(req, res, next) {
    try {
      // const { id } = req.params

      const {
        nomeProduto,
        quantidade,
        descricao
      } = req.body


      const registro = await _produtomodel2.default.create({
        nome: nomeProduto,
        descricao,
        qtdEstoque: quantidade,
        validade :new Date()

      });

      res.status(200).json({ data: registro, message: 'Produto Cadastrado.' })

    } catch (err) {
      console.log(err)
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async find(req, res, next) {
    throw new Error('Method not implemented.')
  }

  async update(req, res, next) {
    try {
      const { qtd, idProduto, idPed, fkUsuario } = req.body;
      const entregador = await _usuariomodel2.default.findOne({
        where: { id: fkUsuario },
      });
      // Converter qtd e idProduto em números
      const quantidade = parseInt(qtd);
      const produtoId = idProduto;

      // Verificar se qtd e idProduto são números válidos
      if (isNaN(quantidade)) {
        return res.status(400).json({ message: 'A quantidade deve ser um número válido.' });
      }
      const prod = await _produtomodel2.default.findOne({
        where: { id: produtoId },
      });

      if (!prod) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
      }

      if (_optionalChain([prod, 'optionalAccess', _ => _.qtdEstoque]) < quantidade) {
        return res.status(200).json({ message: 'O estoque não tem essa quantidade.' });
      } else {
        const novoEstoque = _optionalChain([prod, 'optionalAccess', _2 => _2.qtdEstoque]) - quantidade;

        await _produtomodel2.default.update(
          {
            qtdEstoque: novoEstoque,
            
          },
          {
            where: {
              id: produtoId,
            },
          }
        );

        if(entregador){
          await _pedidomodel2.default.update(
            {
              status: 'Entregue',
              entregePor: _optionalChain([entregador, 'optionalAccess', _3 => _3.nome]),
              dataRetirada :  new Date()
  
            },
            {
              where: {
                id: idPed,
              },
            }
          );

        }else{
          await _pedidomodel2.default.update(
            {
              status: 'Entregue',
              entregePor:'Administrtador',
              dataRetirada :  new Date()
  
            },
            {
              where: {
                id: idPed,
              },
            }
          );

        }

       

        return res.status(200).json({ message: 'Produto entrege e estoque atualizado com sucesso.' });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }

  async updateEstoque(req, res, next) {
    try {
      const { fkProduto,
        quantidade, usuario } = req.body;


      // Converter qtd e idProduto em números
      const qtd = parseInt(quantidade);


      // Verificar se qtd e idProduto são números válidos
      if (isNaN(qtd)) {
        return res.status(400).json({ message: 'A quantidade deve ser um número válido.' });
      }



      const prod = await _produtomodel2.default.findOne({
        where: { id: fkProduto },
      });

      if (!prod) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
      }

      const novoEstoque = _optionalChain([prod, 'optionalAccess', _4 => _4.qtdEstoque]) + qtd;


      await _entradamodel2.default.create(
        {
          quantidade,
          Data: new Date(),
          fkProduto,
          fkUsuario : usuario
        },
        
      );


      await _produtomodel2.default.update(
        {
          qtdEstoque: novoEstoque,
        },
        {
          where: {
            id: fkProduto,
          },
        }
      );

   

      return res.status(200).json({ message: 'Estoque atualizado com sucesso.' });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }



  async delete(req, res, next) {
    throw new Error('Method not implemented.')
  }

  async search (req, res, next) {
    try {
      const { pesquisa, dataInicio, dataFim } = req.query
      console.log('ttt'+dataInicio)

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
          fkProduto: pesquisa
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

exports. default = new ProdutoController()
