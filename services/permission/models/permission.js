'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Permission.init({
    userId: DataTypes.INTEGER,
    canAdd: DataTypes.BOOLEAN,
    canEdit: DataTypes.BOOLEAN,
    canDelete: DataTypes.BOOLEAN,
    canView: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Permission',
  });
  return Permission;
};