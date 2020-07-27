/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pelajaran', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nama_pelajaran: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pelajaran'
  });
};
