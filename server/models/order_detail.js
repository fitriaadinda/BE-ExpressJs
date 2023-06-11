import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class order_detail extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ordet_order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'orders',
        key: 'order_id'
      }
    },
    ordet_prod_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'prod_id'
      }
    },
    ordet_price: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    ordet_quantity: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    ordet_discount: {
      type: DataTypes.REAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'order_detail',
    schema: 'sales',
    timestamps: false,
    indexes: [
      {
        name: "ordet_order_product_pk",
        unique: true,
        fields: [
          { name: "ordet_order_id" },
          { name: "ordet_prod_id" },
        ]
      },
    ]
  });
  }
}
