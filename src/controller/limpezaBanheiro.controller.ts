import { Request, Response, NextFunction } from 'express'
import { IController } from './controller.inteface'
import LimpezaBanheiro from '../model/limpezaBanheiro.model'
import Banheiro from '../model/banheiro.model'
import Arquivo from '../model/arquivo.model'
import Local from '../model/local.model'
import Usuario from '../model/usuario.model'


class LimpezaBanheiroController implements IController {
  async all (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
  

      const registro = await LimpezaBanheiro.findAll({ 
        include: [ Usuario , Banheiro, Arquivo],
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


  async create (req: Request, res: Response, next: NextFunction): Promise<any> {
    try{
      const {
        codigoBanheiro,
       observacao,
       listaDeArquivosEnviados,
       fkUsuario,
       caminho,
       status

      } = req.body

      const banheiro = await Banheiro.findOne({
        where: { codigo: codigoBanheiro
      }
      })

      if(status === 'em andamento'){
        const atividade = await LimpezaBanheiro.create({
          avaliado:false,
          fkUsuario,
          fkLocal: banheiro?.id,
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

  async find (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params
      const {
        fkLimpezaBanheiro
      } = req.body

      

      // let registro = await LimpezaBanheiro.findOne({ where: { id } })


      await LimpezaBanheiro.update(
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

  async updateAdm (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params
      const {
        fkLimpezaBanheiro,status
      } = req.body

      if(status === 'aprovado'){

        await LimpezaBanheiro.update(
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

        await LimpezaBanheiro.update(
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




      

      // let registro = await LimpezaBanheiro.findOne({ where: { id } })



      

      res.status(200).json({  message: 'Alteração realizada com sucesso.' })
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async delete (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async search (req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      const { pesquisa } = req.query
   

      const registros = await LimpezaBanheiro.findAll({
        include: [
          Banheiro, Usuario  
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

export default new LimpezaBanheiroController()
