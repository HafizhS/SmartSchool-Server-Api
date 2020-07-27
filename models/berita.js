/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('berita', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'berita'
  });
};
