/* jshint indent: 2 */
const { Sequelize, DataTypes } = require("sequelize");

/**
 * 
 * @param {Sequelize} sequelize 
 * @param {DataTypes} DataTypes 
 * 
 */
module.exports = function(sequelize, DataTypes) {
  let pelajaran = sequelize.define('pelajaran', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nama_pelajaran: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    timestamps: false,
    tableName: 'pelajaran'
  });

  return pelajaran;
};
