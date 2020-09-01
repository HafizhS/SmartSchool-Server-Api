/* jshint indent: 2 */
const { Sequelize,DataTypes } = require("sequelize");
const db = require('../config/database');

/**
 * 
 * @param {Sequelize} sequelize 
 * @param {DataTypes} DataTypes
 * 
 */
module.exports = function(sequelize, DataTypes) {
  const berita =  sequelize.define('berita', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: 'user',
        },
        key: 'id_user'
      }
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    timestamp: true,
    underscored: true,
    tableName: 'berita'
  });

  var User = require('./user')(sequelize,DataTypes);
  berita.belongsTo(User,{
    foreignKey: 'id_user'
  });

  return berita;
};
