'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Barang.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name cannot be empty"
        },
        notEmpty: {
          msg: "Name cannot be empty"
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Category cannot be empty"
        },
        notEmpty: {
          msg: "Category cannot be empty"
        }
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Amount cannot be empty"
        },
        notEmpty: {
          msg: "Amount cannot be empty"
        },
        isInt: {
          msg: "Amount must be number"
        },
        min: {
          args: 1,
          msg: "Amount min: 1"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price cannot be empty"
        },
        notEmpty: {
          msg: "Price cannot be empty"
        },
        isInt: {
          msg: "Price must be number"
        },
        min: {
          args: 1,
          msg: "Price min: 1"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Barang',
  });
  return Barang;
};