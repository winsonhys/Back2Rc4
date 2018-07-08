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

  @Column({
    allowNull: false,
    type: DataType.ENUM(
      "TR1",
      "TR2",
      "TR3",
      "TR4",
      "SR1",
      "SR2",
      "SR3",
      "SR4",
      "SR5",
      "SR6",
      "MPH"
    )
  })
  location: string;

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
