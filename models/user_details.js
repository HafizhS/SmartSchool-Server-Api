/* jshint indent: 2 */

const { Sequelize, DataTypes } = require("sequelize");

/**
 * 
 * @param {Sequelize} sequelize 
 * @param {DataTypes} DataTypes 
 * 
 */
module.exports = function(sequelize) {
  const userDetail = sequelize.define('user_details', {
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
    nickname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fullname: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    timestamps: false,
    tableName: 'user_details'
  });

  // const Users = require('./user')(sequelize);
  // userDetail.belongsTo(Users,{
  //   foreignKey: 'id'
  // });

  return userDetail;
};
