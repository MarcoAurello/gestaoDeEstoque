import { Request, Response, NextFunction } from 'express'
import { IController } from './controller.inteface'
import Pedido from '../model/pedido.model'
import Produto from '../model/produto.model';
import Local from '../model/local.model';
import Area from '../model/area.model';
import Usuario from '../model/usuario.model';
const { Op } = require('sequelize');

class PedidoController implements IController {
  async all (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const registros = await Pedido.findAll(
        {include: [ Produto , Local]
        }
      )

      console.log(JSON.stringify('xx2'+JSON.stringify(registros)))

      res.status(200).json({ data: registros })
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async create (req: Request, res: Response, next: NextFunction): Promise<any> {
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
        const user = await Usuario.findOne({ where: { cpf: id } })
         
        registro = await Pedido.create({
          quantidadeRetirada : quantidade,
          status:"não retirado",
          fkSolicitante: user?.id,
          fkLocal,
          fkProduto:fkPoduto
         
        });

      }else{

         registro = await Pedido.create({
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

  async find (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params
      console.log(id)
    

      const registro = await Pedido.findAll({ 
        include: [ Produto , Local],
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

  async update (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params;
      // console.log('2222')

      await Pedido.destroy({
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


  
  async search (req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      const { pesquisa } = req.query
   

      const registros = await Pedido.findAll({
        include: [
          {
            model: Usuario,
            where: {
              nome: {
                [Op.like]: `%${pesquisa}%`
              }
            }
          },
          {
            model: Local
          },
          {
            model: Produto
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

export default new PedidoController()
