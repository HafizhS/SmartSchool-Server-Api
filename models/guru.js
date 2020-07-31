/* jshint indent: 2 */

const { Sequelize,DataTypes } = require("sequelize");
const db = require('../config/database');

/**
 * 
 * @param {Sequelize} sequelize 
 * 
 */
module.exports = function(sequelize,asd,model) {
  
  const guru = sequelize.define('guru', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: {
          tableName: 'user',
        },
        key: 'id'
      }
    },
    nip: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    tableName: 'guru'
  });

  const User = require('./user')(sequelize);
  guru.belongsTo(User,{
    foreignKey: 'id'
  });

  // console.log(global.serverModel);
  const Kelas = require('./kelas')(sequelize);
  guru.hasOne(Kelas,{
    foreignKey: 'id_kelas_walikelas'
  });

  return guru;
};
