import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { Topic } from '../models/Topic'
import { Comment } from '../models/Comment'

const {
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
} = process.env

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  database: POSTGRES_DB,
  username: POSTGRES_USER ?? 'postgres',
  password: POSTGRES_PASSWORD ?? 'postgres',
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
