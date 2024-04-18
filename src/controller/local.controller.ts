import { Request, Response, NextFunction } from 'express'
import { IController } from './controller.inteface'
import Local from '../model/local.model'
import Produto from '../model/produto.model'
import Pedido from '../model/pedido.model'
import Usuario from '../model/usuario.model'
const { Op } = require('sequelize');

class LocalController implements IController {
  async all(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const registros = await Local.findAll({ order: [['nome', 'asc']] })


      res.status(200).json({ data: registros })
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      // const { id } = req.params

      const {
        fkUnidade,
        nomeAmbiente
      } = req.body


      const registro = await Local.create({
        nome: nomeAmbiente,
        fkUnidade

      });

      res.status(200).json({ data: registro, message: 'Ambiente Cadastrado.' })

    } catch (err) {
      console.log(err)
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async find(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params
      console.log('cvf' + id)

      const registro = await Local.findAll({ where: { fkUnidade: id } })

      res.status(200).json({ data: registro })
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async search(req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      const { pesquisa } = req.query

      const registros = await Local.findAll({

        where: {
          fkUnidade: pesquisa,
        },
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

  async searchRelatorio(req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      const { pesquisa } = req.query
      // console.log(JSON.stringify('papai'+pesquisa))


      // const local = await Local.findOne({
      //   where: { nome: pesquisa },
      // });

      const registros = await Pedido.findAll({
        include: [Produto, Local, Usuario],
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


  async searchPorLocal(req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      const { pesquisa, dataInicio, dataFim } = req.query

    
      const dataFimFinal = new Date(dataFim);
      dataFimFinal.setHours(23, 59, 59);

      const dataInicial = new Date(dataInicio);
      dataInicial.setHours(1, 0, 0);





      const registros = await Pedido.findAll({
        include: [Usuario, Produto, Local],
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

export default new LocalController()
