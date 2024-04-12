import { Request, Response, NextFunction } from 'express'
import { IController } from './controller.inteface'
import Produto from '../model/produto.model'
import Pedido from '../model/pedido.model'
import { DATE } from 'sequelize'
import Entrada from '../model/entrada.model'
import Usuario from '../model/usuario.model'
import Local from '../model/local.model'

class ProdutoController implements IController {
  async all(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const registros = await Produto.findAll({
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
  async create(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      // const { id } = req.params

      const {
        nomeProduto,
        quantidade,
        descricao
      } = req.body


      const registro = await Produto.create({
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

  async find(req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { qtd, idProduto, idPed } = req.body;


      // Converter qtd e idProduto em números
      const quantidade = parseInt(qtd);
      const produtoId = idProduto;

      // Verificar se qtd e idProduto são números válidos
      if (isNaN(quantidade)) {
        return res.status(400).json({ message: 'A quantidade deve ser um número válido.' });
      }



      const prod = await Produto.findOne({
        where: { id: produtoId },
      });

      if (!prod) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
      }

      if (prod?.qtdEstoque < quantidade) {
        return res.status(200).json({ message: 'O estoque não tem essa quantidade.' });
      } else {
        const novoEstoque = prod?.qtdEstoque - quantidade;

        await Produto.update(
          {
            qtdEstoque: novoEstoque,
          },
          {
            where: {
              id: produtoId,
            },
          }
        );

        await Pedido.update(
          {
            status: 'Entregue',
            dataRetirada :  new Date()

          },
          {
            where: {
              id: idPed,
            },
          }
        );

        return res.status(200).json({ message: 'Estoque atualizado com sucesso.' });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }

  async updateEstoque(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { fkProduto,
        quantidade, usuario } = req.body;


      // Converter qtd e idProduto em números
      const qtd = parseInt(quantidade);


      // Verificar se qtd e idProduto são números válidos
      if (isNaN(qtd)) {
        return res.status(400).json({ message: 'A quantidade deve ser um número válido.' });
      }



      const prod = await Produto.findOne({
        where: { id: fkProduto },
      });

      if (!prod) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
      }

      const novoEstoque = prod?.qtdEstoque + qtd;


      await Entrada.create(
        {
          quantidade,
          Data: new Date(),
          fkProduto,
          fkUsuario : usuario
        },
        
      );


      await Produto.update(
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



  async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async search (req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      const { pesquisa } = req.query
    

      const registros = await Pedido.findAll({
        include: [Usuario,Produto,Local],
        where: {
          fkProduto:  pesquisa 
          
        },

        order: [['dataRetirada', 'DESC']] // Ordena por dataRetirada em ordem decrescente
      })

      

  

      console.log('chii'+JSON.stringify(registros))

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

export default new ProdutoController()
