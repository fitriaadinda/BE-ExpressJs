import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class region extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    region_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    region_name: {
      type: DataTypes.STRING(25),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'region',
    schema: 'sales',
    timestamps: false,
    indexes: [
      {
        name: "region_pkey",
        unique: true,
        fields: [
          { name: "region_id" },
        ]
      },
    ]
  });
  }
}