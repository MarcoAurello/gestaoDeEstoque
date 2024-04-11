import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'

import Perfil from '../model/perfil.model'
import Unidade from '../model/unidade.model'
import Usuario from '../model/usuario.model'
import { IController } from './controller.inteface'
import Pedido from '../model/pedido.model'
import Produto from '../model/produto.model'
import Local from '../model/local.model'

class UsuarioController implements IController {
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

  async all(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const registros = await Usuario.findAll({
        order: [['nome', 'asc']]
      })

      res.status(200).json({ data: registros })
    } catch (err) {
      res.status(401).json({ message: err.errors[0].message })
    }
  }


  async create(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      // const { id } = req.params

      const {
        nome,
        chapa,
        senha,
        fkPerfil
      } = req.body
      console.log('qqqqqq' + senha)

      console.log(req.body)

      // const registro = await Usuario.create({
      //   nome,
      //   chapa,
      //   senha


      // });

      const reg = await Usuario.findOne({ where: { chapa } })

      if (reg) {
        return res.status(401).json({ message: 'Chapa já cadastrada.' })
      } else {
        const registro = await Usuario.create({
          nome: nome,
          email: nome,
          chapa: chapa,
          validado: false,
          // perfil: fk?.nome,
          cpf: '000000000',
          password: senha,
          fkPerfil,
          passwordHash: await bcrypt.hash(senha, senha.length),
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

  async find(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params

      const registro = await Usuario.findOne({
        where: {
          id
        },
        include: [
          Perfil]
      })

      res.status(200).json({ data: registro })
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<any> {
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

      console.log(req.body)

      await Usuario.update({
        nome,
        telefone,
        chapa,
        demandante,
        fkPerfil,
        fkUnidade,

        ativo,
        primeiroLogin
      }, {
        where: {
          id
        },
        individualHooks: false
      })

      const registro = await Usuario.findOne({ where: { id } })

      res.status(200).json({ data: registro, message: 'Alteração realizada com sucesso.' })
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async validar(req: any, res: Response, next: NextFunction): Promise<any> {
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

      await Usuario.update({
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

      const registro = await Usuario.findOne({ where: { id } })

      res.status(200).json({ data: registro, message: 'Usuário validado com sucesso.' })
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async updatePrimeiroAcesso(req: any, res: Response, next: NextFunction): Promise<any> {
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



      await Usuario.update({
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

      const registro = await Usuario.findOne({ where: { id: req.usuario.id } })

      res.status(200).json({ data: registro, message: 'Alteração realizada com sucesso.' })
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async search(req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      const { pesquisa } = req.query


      const registros = await Pedido.findAll({
        include: [Usuario, Produto, Local],
        where: {
          fkSolicitante: pesquisa

        }
      })





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

  async equipe(req: any, res: Response, next: NextFunction): Promise<any> {
    try {


      const pagina = parseInt(req.query.pagina) || 1
      const tamanho = parseInt(req.query.tamanho) || 10

      const offset = (pagina - 1) * tamanho
      const limit = tamanho

      const numeroDePaginas = Math.ceil((await Usuario.count()) / tamanho)

      const registros = await Usuario.findAll({
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

  async naoValidado(req: any, res: Response, next: NextFunction): Promise<any> {
    try {

      const pagina = parseInt(req.query.pagina) || 1
      const tamanho = parseInt(req.query.tamanho) || 10

      const offset = (pagina - 1) * tamanho
      const limit = tamanho

      const numeroDePaginas = Math.ceil((await Usuario.count({ include: Perfil })) / tamanho)

      const registros = await Usuario.findAll({

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

  async checkFuncionario(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params;
      let cpf = id.replace(/\D/g, "");
  
      const [registros] = await Usuario.sequelize?.query(`
        SELECT CHAPA, NOME, CPF
        FROM TermoAceite.dbo.TOTVS
        WHERE CPF = '${cpf}'`
      );
  
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


}

export default new UsuarioController()
