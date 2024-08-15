import { Request, Response, NextFunction } from 'express'
import { IController } from './controller.inteface'
import Pedido from '../model/pedido.model'
import Produto from '../model/produto.model';
import Local from '../model/local.model';
import Area from '../model/area.model';
import Usuario from '../model/usuario.model';
const { Op } = require('sequelize');

class PedidoController implements IController {

  async all(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const registros = await Pedido.findAll(
        {
          include: [Produto, Local, Usuario]
        }
      )

      console.log(JSON.stringify('xx2' + JSON.stringify(registros)))

      res.status(200).json({ data: registros })
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async porProduto(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      // SQL Query
      let registro = []
      registro = await Pedido.sequelize?.query(`
       SELECT 
    p.nome, 
    FORMAT(pd.createdAt, 'yyyy-MM') AS mes,
    COUNT(*) AS quantidade_pedidos
FROM 
    pedido pd
JOIN 
    produto p ON pd.fkProduto = p.id
GROUP BY 
    p.nome, FORMAT(pd.createdAt, 'yyyy-MM')
ORDER BY 
   p.nome;

      `);

      console.log(JSON.stringify('xx2' + JSON.stringify(registro)));

      res.status(200).json({ data: registro });
    } catch (err) {
      res.status(401).json({ message: err.message || 'Erro ao consultar pedidos' });
    }
  }

  async porFuncionario(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      // SQL Query
      let registro = []
      registro = await Pedido.sequelize?.query(`
      SELECT 
    u.nome, 
    FORMAT(pd.createdAt, 'yyyy-MM') AS mes,
    COUNT(*) AS quantidade_pedidos
FROM 
    pedido pd
JOIN 
    usuario u ON pd.fkSolicitante = u.id
GROUP BY 
    u.nome, FORMAT(pd.createdAt, 'yyyy-MM')
ORDER BY 
     u.nome;

      `);

      console.log(JSON.stringify('xx2' + JSON.stringify(registro)));

      res.status(200).json({ data: registro });
    } catch (err) {
      res.status(401).json({ message: err.message || 'Erro ao consultar pedidos' });
    }
  }

  async porLocal(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      // SQL Query
      let registro = []
      registro = await Pedido.sequelize?.query(`
       SELECT 
    l.nome, 
    FORMAT(pd.createdAt, 'yyyy-MM') AS mes,
    COUNT(*) AS quantidade_pedidos
FROM 
    pedido pd
JOIN 
    local l ON pd.fkLocal = l.id
GROUP BY 
    l.nome, FORMAT(pd.createdAt, 'yyyy-MM')
ORDER BY 
   l.nome;
 
      `);

      console.log(JSON.stringify('xx2' + JSON.stringify(registro)));

      res.status(200).json({ data: registro });
    } catch (err) {
      res.status(401).json({ message: err.message || 'Erro ao consultar pedidos' });
    }
  }



  async create(req: Request, res: Response, next: NextFunction): Promise<any> {
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

      console.log('lulu' + fkPoduto)

      // const registro = await Usuario.create({
      //   nome,
      //   chapa,
      //   senha


      // });

      let registro = []

      if (id) {
        const user = await Usuario.findOne({ where: { cpf: id } })

        registro = await Pedido.create({
          quantidadeRetirada: quantidade,
          status: "não retirado",
          fkSolicitante: user?.id,
          fkLocal,
          fkProduto: fkPoduto

        });

      } else {

        registro = await Pedido.create({
          quantidadeRetirada: quantidade,
          status: "não retirado",
          fkSolicitante: fkUsuario,
          fkLocal,
          fkProduto: fkPoduto

        });


      }




      res.status(200).json({ data: registro, message: 'Produto solicitado.' })

    } catch (err) {
      console.log(err)
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async find(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params
      console.log(id)


      const registro = await Pedido.findAll({
        include: [Produto, Local],
        where: {
          fkSolicitante: id,
          Status: 'não retirado'
        },

      });
      console.log(JSON.stringify('xx1' + JSON.stringify(registro)))

      res.status(200).json({ data: registro })
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async findAlter(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params
      console.log(id)


      const registro = await Pedido.findOne({
        include: [Produto, Local],
        where: {
          id,

        },

      });
      console.log(JSON.stringify('xx1' + JSON.stringify(registro)))

      res.status(200).json({ data: registro })
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message })
    }
  }


  async update(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params;
      const { quantidade } = req.body;

      await Pedido.update({
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



  async search(req: any, res: Response, next: NextFunction): Promise<any> {
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
          status: 'não retirado'

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
