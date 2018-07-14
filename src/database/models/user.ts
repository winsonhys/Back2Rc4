import {
  Table,
  Column,
  Model,
  AllowNull,
  PrimaryKey,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany,
  Unique
} from "sequelize-typescript";
import Events from "./events";

@Table({ tableName: "Users" })
export default class User extends Model<User> {
  @PrimaryKey
  @Column({
    allowNull: false,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  id: string;

  @AllowNull(false)
  @Column
  username: string;

  @AllowNull(false)
  @Column
  password: string;

  @AllowNull(false)
  @Unique
  @Column
  email: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM("STAFF", "RF", "HH", "CLUBSOC"),
    defaultValue: "STAFF"
  })
  permissionLevel: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @HasMany(() => Events)
  events: Events[];
}
