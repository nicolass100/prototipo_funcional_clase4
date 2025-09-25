import { DataTypes } from 'sequelize';

export default function ProductModel(sequelize) {
  return sequelize.define('Product', {
    id:    { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name:  { type: DataTypes.STRING,  allowNull: false },
    price: { type: DataTypes.FLOAT,   allowNull: false, defaultValue: 0 },
    stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  }, { tableName: 'products' });
}
