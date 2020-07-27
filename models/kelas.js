/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kelas', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    kelas: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    id_kelas_walikelas: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: 'kelas_walikelas',
        },
        key: 'id'
      }
    },
    id_jurusan: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: 'jurusan',
        },
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'kelas'
  });
};
