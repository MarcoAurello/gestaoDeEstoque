/* eslint-disable n/handle-callback-err */
import { Request, Response, NextFunction } from 'express'
import ActivityDirectory from 'activedirectory'
import Usuario from '../model/usuario.model'
import ConfiguracaoGlobal from '../model/configuracaoGeral.model'
import bcrypt from 'bcrypt'

class AuthenticationController {
  async login (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { chapa, password } = req.body

      const configuracao = await ConfiguracaoGlobal.findOne()
    

      // const ad = new ActivityDirectory(config)

      if (!chapa) {
        return res.status(401).json({ message: 'O campo chapa deve ser preenchido corretamente.' })
      }

      if (!password) {
        return res.status(401).json({ message: 'O campo senha deve ser preenchido corretamente.' })
      }
 
        const registro = await Usuario.findOne({ where: { chapa} })

        if (!registro) {
          return res.status(401).json({ message: 'Não foi possível localizar o usuário.' })
        }

        if (!await bcrypt.compare(password, registro.passwordHash)) {
          return res.status(401).json({ message: 'Senha inválida.' })
        }

        const token = registro.generateToken();
        console.log(token);
        return res.status(200).json({ message: 'Usuário validado com sucesso.', token })
      
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: 'Login ou senha inválidos.' })
    }
  }

  async logged (req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      res.status(200).json({ data: req.usuario })
    } catch (err) {
      return res.status(401).json({ message: err.errors[0].message })
    }
  }
}

export default new AuthenticationController()
