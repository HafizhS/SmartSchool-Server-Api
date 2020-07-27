/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kelas_jadwal_pelajaran', {
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
    id_guru_pelajaran: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: 'guru_pelajaran',
        },
        key: 'id'
      }
    },
    jam_mulai: {
      type: DataTypes.DATE,
      allowNull: true
    },
    jam_selesai: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'kelas_jadwal_pelajaran'
  });
};
