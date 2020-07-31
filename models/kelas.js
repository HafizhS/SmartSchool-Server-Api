/* jshint indent: 2 */

const { Sequelize, DataTypes } = require("sequelize");

/**
 * 
 * @param {Sequelize} sequelize 
 * @param {DataTypes} DataTypes 
 * 
 */
module.exports = function(sequelize) {
  const kelas = sequelize.define('kelas', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    kelas: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    id_kelas_walikelas: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: 'kelas_walikelas',
        },
        key: 'id'
      }
    },
    id_jurusan: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: 'jurusan',
        },
        key: 'id'
      }
    }
  }, {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    tableName: 'kelas',
    name: {
      plural: "kelas",
      singular: "kelas"
    }
  });

  const Walikelas = require('./kelas_walikelas')(sequelize);
  kelas.belongsTo(Walikelas,{
    foreignKey: "id_kelas_walikelas"
  });

  // const Guru = require('./guru')(sequelize);
  // kelas.belongsTo(Guru,{
  //   foreignKey: "id_kelas_walikelas"
  // })

  return kelas;
};
