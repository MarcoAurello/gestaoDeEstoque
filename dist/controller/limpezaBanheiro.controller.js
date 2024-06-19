"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _limpezaBanheiromodel = require('../model/limpezaBanheiro.model'); var _limpezaBanheiromodel2 = _interopRequireDefault(_limpezaBanheiromodel);
var _banheiromodel = require('../model/banheiro.model'); var _banheiromodel2 = _interopRequireDefault(_banheiromodel);
var _arquivomodel = require('../model/arquivo.model'); var _arquivomodel2 = _interopRequireDefault(_arquivomodel);

var _usuariomodel = require('../model/usuario.model'); var _usuariomodel2 = _interopRequireDefault(_usuariomodel);


class LimpezaBanheiroController  {
  async all (req, res, next) {
    try {
  

      const registro = await _limpezaBanheiromodel2.default.findAll({ 
        include: [ _usuariomodel2.default , _banheiromodel2.default, _arquivomodel2.default],
        where: { 
          avaliado: false,
          status:'Concluido'
        },
      
      });
      console.log(JSON.stringify(registro))

      res.status(200).json({ data: registro })
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message })
    }
  }


  async create (req, res, next) {
    try{
      const {
        codigoBanheiro,
       observacao,
       listaDeArquivosEnviados,
       fkUsuario,
       caminho,
       status

      } = req.body

      const banheiro = await _banheiromodel2.default.findOne({
        where: { codigo: codigoBanheiro
      }
      })

      if(status === 'em andamento'){
        const atividade = await _limpezaBanheiromodel2.default.create({
          avaliado:false,
          fkUsuario,
          fkLocal: _optionalChain([banheiro, 'optionalAccess', _ => _.id]),
          status
        })
  

      }

    

      // const atividadeSalva = await LimpezaBanheiro.findOne({
      //   where: { caminho 
      // }
      // })

      // listaDeArquivosEnviados.map((item) => {
      //   Arquivo.update(
      //     {
      //       fkLimpezaBanheiro: atividadeSalva?.id
      //     },
      //     {
      //       where: { id: item.id }
      //     }
      //   )
      // })


     


      res.status(200).json({ message: 'serviço aberto' })
    }catch (err) {
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

  async find (req, res, next) {
    try {
      const { id } = req.params
      console.log(id)
    

      const registro = await _limpezaBanheiromodel2.default.findAll({ 
        // include: [ Produto , Local],
        where: { 
          fkUsuario: id,
         
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
      const { id } = req.params
      const {
        fkLimpezaBanheiro
      } = req.body

      

      // let registro = await LimpezaBanheiro.findOne({ where: { id } })


      await _limpezaBanheiromodel2.default.update(
        {
          status: 'Concluido',
        },
        {
          where: {
            id
          },
        }
      );

      

      res.status(200).json({  message: 'Alteração realizada com sucesso.' })
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async updateAdm (req, res, next) {
    try {
      const { id } = req.params
      const {
        fkLimpezaBanheiro,status
      } = req.body

      if(status === 'aprovado'){

        await _limpezaBanheiromodel2.default.update(
          {
            status: 'aprovado',
            avaliado:true
          },
          {
            where: {
              id
            },
          }
        );



      }
      if(status === 'reprovado'){

        await _limpezaBanheiromodel2.default.update(
          {
            status: 'reprovado',
            avaliado:true
          },
          {
            where: {
              id
            },
          }
        );

      }



      res.status(200).json({  message: 'Alteração realizada com sucesso.' })
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async delete (req, res, next) {
    throw new Error('Method not implemented.')
  }

  async search (req, res, next) {
    try {
      const { pesquisa } = req.query
   

      const registros = await _limpezaBanheiromodel2.default.findAll({
        include: [
          _banheiromodel2.default, _usuariomodel2.default  
        ],
        where: {
          status:  'em andamento' ,
          fkUsuario: pesquisa
          
        }
      })

      

  

      console.log('mama'+JSON.stringify(registros))

      res.status(200).json({ data: registros , message:'Foto enviada com sucesso'})
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

exports. default = new LimpezaBanheiroController()
