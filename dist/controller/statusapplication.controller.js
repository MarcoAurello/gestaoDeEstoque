"use strict";Object.defineProperty(exports, "__esModule", {value: true});


class StatusApplication  {
  async all (req, res, next) {
    try {
      res.status(200).json({ message: 'OK' })
    } catch (err) {
      res.status(401).json({ message: '' })
    }
  }

  async create (req, res, next) {
    throw new Error('Method not implemented.')
  }

  async find (req, res, next) {
    throw new Error('Method not implemented.')
  }

  async update (req, res, next) {
    throw new Error('Method not implemented.')
  }

  async delete (req, res, next) {
    throw new Error('Method not implemented.')
  }

  async search (req, res, next) {
    throw new Error('Method not implemented.')
  }
}

exports. default = new StatusApplication()
