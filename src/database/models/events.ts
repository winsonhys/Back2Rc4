import User from "./user";
import {
  Table,
  Column,
  Model,
  AllowNull,
  PrimaryKey,
  DataType,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  ForeignKey
} from "sequelize-typescript";

@Table({ tableName: "Events" })
export default class Events extends Model<Events> {
  @PrimaryKey
  @Column({
    allowNull: false,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  id: string;

  @AllowNull(false)
  @Column
  title: string;

  @AllowNull(false)
  @Column
  start: Date;

  @AllowNull(false)
  @Column
  end: Date;

  @Column({
    allowNull: false,
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  allDay: boolean;

  @Column({
    allowNull: false,
    type: DataType.ENUM("NUS", "COLLEGE", "HOUSE", "IG")
  })
  type: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @BelongsTo(() => User, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  })
  user: User;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  userId: string;
}
