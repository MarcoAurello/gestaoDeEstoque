"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _perfilmodel = require('../model/perfil.model'); var _perfilmodel2 = _interopRequireDefault(_perfilmodel);

var _usuariomodel = require('../model/usuario.model'); var _usuariomodel2 = _interopRequireDefault(_usuariomodel);

var _pedidomodel = require('../model/pedido.model'); var _pedidomodel2 = _interopRequireDefault(_pedidomodel);
var _produtomodel = require('../model/produto.model'); var _produtomodel2 = _interopRequireDefault(_produtomodel);
var _localmodel = require('../model/local.model'); var _localmodel2 = _interopRequireDefault(_localmodel);
const { Op } = require('sequelize');

class UsuarioController  {
  // async all (req: any, res: Response, next: NextFunction): Promise<any> {
  //   try {
  //     const pagina = parseInt(req.query.pagina) || 1
  //     const tamanho = parseInt(req.query.tamanho) || 10

  //     const offset = (pagina - 1) * tamanho
  //     const limit = tamanho

  //     const numeroDePaginas = Math.ceil((await Usuario.count()) / tamanho)

  //     const usuarios = await Usuario.findAll({
  //       limit,
  //       offset,
  //       include: [Perfil]
  //     })

  //     res.status(200).json({
  //       data: usuarios,
  //       paginacao: {
  //         pagina,
  //         tamanho,
  //         numeroDePaginas
  //       }
  //     })
  //   } catch (err) {
  //     res.status(401).json({ message: err.errors[0].message })
  //   }
  // }

  async all(req, res, next) {
    try {
      const registros = await _usuariomodel2.default.findAll({
        order: [['nome', 'asc']]
      })

      res.status(200).json({ data: registros })
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message })
    }
  }


  async create(req, res, next) {
    try {
      // const { id } = req.params

      const {
        nome,
        chapa,
        senha,
        fkPerfil,
        cpf
      } = req.body
      console.log('qqqqqq' + senha)

      console.log(req.body)

      // const registro = await Usuario.create({
      //   nome,
      //   chapa,
      //   senha


      // });
      let perf = []
      if(fkPerfil === '2'  ){
         perf = await _perfilmodel2.default.findOne({ where: { nome:'Usuario' } })

      }

      if(fkPerfil === '20' ){
         perf = await _perfilmodel2.default.findOne({ where: { nome:'Administrador' } })

      }

      const reg = await _usuariomodel2.default.findOne({ where: { chapa } })

      if (reg) {
        return res.status(401).json({ message: 'Chapa já cadastrada.' })
      } else {
        const registro = await _usuariomodel2.default.create({
          nome: nome,
          
          chapa: chapa,
          validado: false,
          // perfil: fk?.nome,
          cpf: cpf,
          password: senha,
          fkPerfil: _optionalChain([perf, 'optionalAccess', _ => _.id]),
          passwordHash: await _bcrypt2.default.hash(senha, senha.length),
          ativo: true,
          primeiroLogin: true,
        });



        res.status(200).json({ data: registro, message: 'Alteração realizada com sucesso.' })

      }





    } catch (err) {
      console.log(err)
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async find(req, res, next) {
    try {
      const { id } = req.params

      const registro = await _usuariomodel2.default.findOne({
        where: {
          id
        },
        include: [
          _perfilmodel2.default]
      })

      res.status(200).json({ data: registro })
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params
      console.log(id)
      const {
        nome,
        telefone,
        chapa,
        demandante,
        fkPerfil,
        fkUnidade,
        senha,

        ativo,
        primeiroLogin
      } = req.body

      console.log(req.body)

      await _usuariomodel2.default.update({
        password:senha
      
      }, {
        where: {
          chapa,
          passwordHash: await _bcrypt2.default.hash(senha, senha.length),
        },
        individualHooks: false
      })

      const registro = await _usuariomodel2.default.findOne({ where: { id } })

      res.status(200).json({ data: registro, message: 'Alteração realizada com sucesso.' })
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async validar(req, res, next) {
    try {
      const { id } = req.params
      console.log(id)
      const {
        nome,
        telefone,
        chapa,
        demandante,
        fkPerfil,
        fkUnidade,

        ativo,
        primeiroLogin
      } = req.body

      await _usuariomodel2.default.update({
        nome,
        telefone,
        chapa,
        demandante,
        fkPerfil,
        fkUnidade,

        ativo,
        primeiroLogin,
        validado: true,
        // fkValidador: req.usuario.id
      }, {
        where: {
          id
        },
        individualHooks: false
      })

      const registro = await _usuariomodel2.default.findOne({ where: { id } })

      res.status(200).json({ data: registro, message: 'Usuário validado com sucesso.' })
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async updatePrimeiroAcesso(req, res, next) {
    try {
      const {
        nome,
        telefone,
        chapa,
        fkPerfil,
        fkUnidade,

      } = req.body

      if (!nome) {
        return res.status(401).json({ message: 'O campo nome deve ser preenchido corretamente.' })
      }

      if (!chapa) {
        return res.status(401).json({ message: 'O campo chapa deve ser preenchido corretamente.' })
      }

      if (!telefone) {
        return res.status(401).json({ message: 'O campo telefone deve ser preenchido corretamente.' })
      }

      if (!fkPerfil) {
        return res.status(401).json({ message: 'O campo perfil deve ser preenchido corretamente.' })
      }

      if (!fkUnidade) {
        return res.status(401).json({ message: 'O campo unidade deve ser preenchido corretamente.' })
      }



      await _usuariomodel2.default.update({
        nome,
        telefone,
        chapa,
        fkPerfil,
        fkUnidade,

        primeiroLogin: false
      }, {
        where: {
          id: req.usuario.id
        },
        individualHooks: false
      })

      const registro = await _usuariomodel2.default.findOne({ where: { id: req.usuario.id } })

      res.status(200).json({ data: registro, message: 'Alteração realizada com sucesso.' })
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: err.errors[0].message })
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
          fkSolicitante: pesquisa
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


  async equipe(req, res, next) {
    try {


      const pagina = parseInt(req.query.pagina) || 1
      const tamanho = parseInt(req.query.tamanho) || 10

      const offset = (pagina - 1) * tamanho
      const limit = tamanho

      const numeroDePaginas = Math.ceil((await _usuariomodel2.default.count()) / tamanho)

      const registros = await _usuariomodel2.default.findAll({
        limit,
        offset,

        where: {

          validado: true
        }
      })

      res.status(200).json({
        data: registros,
        paginacao: {
          pagina,
          tamanho,
          numeroDePaginas
        }
      })
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async naoValidado(req, res, next) {
    try {

      const pagina = parseInt(req.query.pagina) || 1
      const tamanho = parseInt(req.query.tamanho) || 10

      const offset = (pagina - 1) * tamanho
      const limit = tamanho

      const numeroDePaginas = Math.ceil((await _usuariomodel2.default.count({ include: _perfilmodel2.default })) / tamanho)

      const registros = await _usuariomodel2.default.findAll({

        where: {

          validado: false
        }
      })

      res.status(200).json({
        data: registros,
        paginacao: {
          pagina,
          tamanho,
          numeroDePaginas
        }
      })
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async checkFuncionario(req, res, next) {
    try {
      const { id } = req.params;
      let cpf = id.replace(/\D/g, "");
  
      const [registros] = await _optionalChain([_usuariomodel2.default, 'access', _2 => _2.sequelize, 'optionalAccess', _3 => _3.query, 'call', _4 => _4(`
  SELECT TOP 1 CHAPA, NOME, CPF, SITUACAO
  FROM TermoAceite.dbo.TOTVS
  WHERE CPF = '${cpf}' AND SITUACAO = 'ativo'
`)]);
  
      if (!registros || registros.length === 0) {
        return res.status(401).json({ message: 'Funcionário não encontrado. Entre em contato com a gerência.' });
      }
  
      console.log(registros);
      return res.status(200).json({  message: 'Funcionário Localizado', data: registros });
    } catch (err) {
      console.log(err);
      return res.status(401).json({ message: err.message });
    }
  }

  async recuperarFuncionario(req, res, next) {
    try {
      const { id } = req.params;

      const registros = await _usuariomodel2.default.findOne({ where: { cpf: id } })
    
      if (!registros) {
        return res.status(401).json({ message: 'Funcionário não encontrado. Entre em contato com a gerência.' });
      }
  
      console.log(registros);
      return res.status(200).json({  message: 'Funcionário Localizado', data: registros });
    } catch (err) {
      console.log(err);
      return res.status(401).json({ message: err.message });
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
          fkSolicitante: pesquisa,
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

  async searchCPF(req, res, next) {
    try {
      const { pesquisa } = req.query
    
      const registros = await _usuariomodel2.default.findOne({
       
        where: {
          cpf: pesquisa,
         
        },
    
      });

      if(registros){
        res.status(200).json({ message: 'usuario Localizado', data: registros})

      }else{
        res.status(200).json({ message: 'usuario não encontrado' })

      }
      console.log(JSON.stringify(registros))

      
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

exports. default = new UsuarioController()
