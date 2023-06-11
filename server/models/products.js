import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class products extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    prod_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    prod_name: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    prod_quantity: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    prod_price: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    prod_in_stock: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    prod_in_order: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    prod_reorder_level: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    prod_discontinued: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    prod_supr_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'suppliers',
        key: 'supr_id'
      }
    },
    prod_cate_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'cate_id'
      }
    }
  }, {
    sequelize,
    tableName: 'products',
    schema: 'sales',
    timestamps: false,
    indexes: [
      {
        name: "products_pkey",
        unique: true,
        fields: [
          { name: "prod_id" },
        ]
      },
    ]
  });
  }
}
