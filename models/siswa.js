/* jshint indent: 2 */

const { Sequelize, DataTypes } = require("sequelize");
const kelas = require("./kelas");

/**
 * 
 * @param {Sequelize} sequelize 
 * @param {DataTypes} DataTypes 
 * 
 */
module.exports = function(sequelize,DataTypes) {
  const siswa = sequelize.define('siswa', {
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
    sequelize,
    timestamps: false,
    freezeTableName: true,
    tableName: 'siswa'
  });

  const User = require('./user')(sequelize);
  siswa.belongsTo(User,{
    foreignKey: 'id'
  });

  const Kelas = require('./kelas')(sequelize);
  siswa.belongsTo(Kelas, {
    foreignKey: 'id_kelas'
  });

  return siswa;
};
