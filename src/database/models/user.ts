import {
  Table,
  Column,
  Model,
  AllowNull,
  PrimaryKey,
  DataType,
  CreatedAt,
  UpdatedAt
} from "sequelize-typescript";

@Table({ tableName: "Users" })
export default class User extends Model<User> {
  @PrimaryKey
  @Column({
    allowNull: false,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  id: string;

  @Column
  @AllowNull(false)
  userName: string;

  @Column
  @AllowNull(false)
  password: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
