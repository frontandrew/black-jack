import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript'
import { Comment } from './Comment'
import { TapTopicEmoji } from './TapTopicEmoji'

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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userId!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userName!: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  userEmail?: string

  @HasMany(() => Comment)
  comments!: Comment[]

  @HasMany(() => TapTopicEmoji)
  tapTopicEmoji!: TapTopicEmoji[]
}
