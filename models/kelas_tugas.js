/* jshint indent: 2 */
const { Sequelize, DataTypes } = require("sequelize");

/**
 * 
 * @param {Sequelize} sequelize 
 * @param {DataTypes} DataTypes 
 * 
 */
module.exports = function(sequelize, DataTypes) {
  const kelasTugas = sequelize.define('kelas_tugas', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    id_tugas: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: 'tugas',
        },
        key: 'id'
      }
    },
    tanggal_mulai: {
      type: DataTypes.DATE,
      allowNull: true
    },
    tanggal_berakhir: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'kelas_tugas',
    timestamp: true,
    underscored: true,
    name: {
      singular: "kelas_tugas",
      plural: "kelas_tugas" 
    }

  });

  var tugas = require('./tugas')(sequelize);
  kelasTugas.belongsTo(tugas,{
    foreignKey: "id_tugas"
  });
  // var kelas = require('./tugas')(sequelize);
  // kelasTugas.belongsToMany();

  return kelasTugas;
};
