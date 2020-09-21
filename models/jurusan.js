/* jshint indent: 2 */
const { Sequelize, DataTypes } = require("sequelize");

/**
 * 
 * @param {Sequelize} sequelize 
 * @param {DataTypes} DataTypes 
 * 
 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('jurusan', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    jurusan: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    jurusan_singkatan: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    timestamps: false,
    tableName: 'jurusan'
  });
};
