/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kelas_tugas', {
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
    tableName: 'kelas_tugas'
  });
};
