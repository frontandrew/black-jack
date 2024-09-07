import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import { Emoji } from './Emoji'
import { Topic } from './Topic'

@Table
export class TapTopicEmoji extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userId!: string

  @HasMany(() => Emoji)
  emoji!: Emoji[]

  @ForeignKey(() => Topic)
  @Column
  topicId!: number

  @BelongsTo(() => Topic)
  topic!: Topic
}
