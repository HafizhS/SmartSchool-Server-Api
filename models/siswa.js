/* jshint indent: 2 */

const { Sequelize, DataTypes } = require("sequelize");

/**
 * 
 * @param {Sequelize} sequelize 
 * @param {DataTypes} DataTypes 
 * 
 */
module.exports = function(sequelize) {
  return sequelize.define('siswa', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: {
          tableName: 'user',
        },
        key: 'id'
      }
    },
    id_kelas: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: 'kelas',
        },
        key: 'id'
      }
    },
    nis: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tahun_ajaran: {
      type: 'YEAR',
      allowNull: true
    }
  }, {
    timestamps: false,
    sequelize,
    tableName: 'siswa'
  });
};
