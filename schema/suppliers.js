import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class suppliers extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    supr_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    supr_name: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    supr_contact_name: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    supr_city: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    supr_location_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'suppliers',
    schema: 'sales',
    timestamps: false,
    indexes: [
      {
        name: "supr_id_pk",
        unique: true,
        fields: [
          { name: "supr_id" },
        ]
      },
    ]
  });
  }
}
