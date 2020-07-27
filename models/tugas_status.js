/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tugas_status', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tugas_status'
  });
};
