/* jshint indent: 2 */

const { Sequelize, DataTypes } = require("sequelize");

/**
 * 
 * @param {Sequelize} sequelize 
 * @param {DataTypes} DataTypes 
 * 
 */
module.exports = function(sequelize) {
  const walikelas =  sequelize.define('kelas_walikelas', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: {
          tableName: 'guru',
        },
        key: 'id'
      }
    }
  }, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    tableName: 'kelas_walikelas',
    name: {
      plural: "kelas_walikelas",
      singular: "kelas_walikelas"
    }
  });

  // const Guru = require('./guru')(sequelize);
  // walikelas.belongsTo(Guru,{
  //   foreignKey: "id"
    
  // });

  return walikelas;
};
