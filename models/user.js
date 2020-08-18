/* jshint indent: 2 */

const { Sequelize, DataTypes } = require("sequelize");

/**
 * 
 * @param {Sequelize} sequelize 
 * @param {DataTypes} dataTypes 
 * 
 */
module.exports = function(sequelize) {
  const user = sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    id_role: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: 'role',
        },
        key: 'id'
      },
      defaultValue: 3
    }
  }, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    tableName: 'user',
    name: {
      plural: "user",
      singular: "user"
    }
  });

  const UserDetail = require('./user_details')(sequelize);
  user.belongsTo(UserDetail,{
    foreignKey: 'id'
  });
  
  const Role = require('./role')(sequelize);
  user.belongsTo(Role,{
    foreignKey: 'id_role'
  });

  return user;
};
