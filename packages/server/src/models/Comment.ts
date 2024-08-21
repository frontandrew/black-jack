import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import { Topic } from './Topic'

@Table
export class Comment extends Model {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string

  @ForeignKey(() => Topic)
  @Column
  topicId!: number

  @BelongsTo(() => Topic)
  topic!: Topic
}
