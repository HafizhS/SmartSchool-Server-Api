/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('siswa_tugas', {
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    }
  }, {
    sequelize,
    tableName: 'siswa_tugas'
  });
};
