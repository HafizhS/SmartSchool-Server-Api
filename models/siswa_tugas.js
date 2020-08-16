/* jshint indent: 2 */

const { Sequelize, DataTypes, NOW } = require("sequelize");

/**
 * 
 * @param {Sequelize} sequelize 
 * @param {DataTypes} DataTypes 
 * 
 */
module.exports = function(sequelize,DataTypes) {
  const siswaTugas = sequelize.define('siswa_tugas', {
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      references: {
        model: {
          tableName: 'siswa',
        },
        key: 'id'
      }
    },
    id_kelas_tugas: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: 'kelas_tugas',
        },
        key: 'id'
      }
    },
    id_tugas_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: 'tugas_status',
        },
        key: 'id'
      }
    },
    submited_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'siswa_tugas',
    timestamps: true,
    underscored: true,
    name: {
      plural: "siswa_tugas",
      singular: "siswa_tugas"
    }
  });

  var siswa = require('./siswa')(sequelize,DataTypes);
  var kelasTugas = require('./kelas_tugas')(sequelize,DataTypes);
  siswaTugas.belongsTo(kelasTugas,{
    foreignKey: 'id_kelas_tugas'
  });


  return siswaTugas;
};
