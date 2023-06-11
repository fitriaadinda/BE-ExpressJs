import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class customers extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    cust_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cust_name: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    cust_city: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    cust_location_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'customers',
    schema: 'sales',
    timestamps: false,
    indexes: [
      {
        name: "cust_id_pk",
        unique: true,
        fields: [
          { name: "cust_id" },
        ]
      },
    ]
  });
  }
}
