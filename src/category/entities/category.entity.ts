import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'categories', timestamps: true })
export class Category extends Model<Category> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  create_at: Date;
}
