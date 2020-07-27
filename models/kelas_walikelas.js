/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kelas_walikelas', {
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
    }
  }, {
    sequelize,
    tableName: 'kelas_walikelas'
  });
};
