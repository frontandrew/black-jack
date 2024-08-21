import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript'
import { Comment } from './Comment'

@Table
export class Topic extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string

  @HasMany(() => Comment)
  comments!: Comment[]
}
