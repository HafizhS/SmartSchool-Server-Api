/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('jurusan', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    jurusan: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    jurusan_singkatan: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'jurusan'
  });
};
