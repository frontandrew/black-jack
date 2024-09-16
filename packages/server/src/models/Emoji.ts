import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import { TapTopicEmoji } from './TapTopicEmoji'

@Table
export class Emoji extends Model {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: true,
  })
  emoji!: string

  @ForeignKey(() => TapTopicEmoji)
  @Column
  tapTopicEmojiId!: number

  @BelongsTo(() => TapTopicEmoji)
  tapTopicEmoji!: TapTopicEmoji
}
