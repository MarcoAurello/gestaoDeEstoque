import { Request, Response, NextFunction } from 'express'
import { IController } from './controller.inteface'
import Banheiro from '../model/banheiro.model'

class BanheiroController implements IController {
  async all (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const registros = await Banheiro.findAll()

      res.status(200).json({ data: registros })
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  
  async create(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      // const { id } = req.params

      const {
        fkLocal,
        nomeBanheiro,
        codigoBanheiro

      } = req.body


      const registro = await Banheiro.create({
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
  async find (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async delete (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async search (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

export default new BanheiroController()
