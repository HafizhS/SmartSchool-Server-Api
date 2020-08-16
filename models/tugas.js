/* jshint indent: 2 */
const { Sequelize, DataTypes } = require("sequelize");

/**
 * 
 * @param {Sequelize} sequelize 
 * @param {DataTypes} DataTypes 
 * 
 */
module.exports = function(sequelize) {
  const tugas = sequelize.define('tugas', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tugas: {
      type: DataTypes.TEXT,
      allowNull: true
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
    },
    id_pelajaran: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: 'pelajaran',
        },
        key: 'id'
      }
    },
    // created_at: {
    //   type: DataTypes.DATE,
    //   allowNull: true
    // },
    // updated_at: {
    //   type: DataTypes.DATE,
    //   allowNull: true
    // }
  }, {
    sequelize,
    tableName: 'tugas',
    underscored: true,
    timestamps: true,
    name: {
      plural: "kelas",
      singular: "kelas"
    }
  });

  return tugas;
};
