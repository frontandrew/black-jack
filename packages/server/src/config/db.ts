import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { Topic } from '../models/Topic'
import { Comment } from '../models/Comment'

// const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
//   process.env

const { POSTGRES_DB, POSTGRES_PORT } = process.env

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: Number(POSTGRES_PORT),
  username: 'postgres',
  password: 'postgres',
  database: POSTGRES_DB,
  dialect: 'postgres',
}

export const sequelize = new Sequelize(sequelizeOptions)

sequelize.addModels([Topic, Comment])

export async function dbConnect() {
  try {
    await sequelize.authenticate() // Аутентификация в БД
    await sequelize.sync() // Синхронизация базы данных
    console.log('Connection has been established successfully')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
