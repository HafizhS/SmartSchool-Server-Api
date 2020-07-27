/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tugas', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_guru: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: 'guru',
        },
        key: 'id'
      }
    },
    id_pelajaran: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: 'pelajaran',
        },
        key: 'id'
      }
    },
    tanggal_dibuat: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tugas'
  });
};
