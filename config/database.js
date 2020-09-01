'use strict';

const path = require('path');
const { Sequelize , DataTypes} = require("sequelize");
const db = {};

let sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

db.model = {
    Berita: require('../models/berita')(sequelize, DataTypes),
    Guru: require('../models/guru')(sequelize, DataTypes,db.model),
    GuruPelajaran: require('../models/guru_pelajaran')(sequelize, DataTypes),
    Jurusan: require('../models/jurusan')(sequelize, DataTypes),
    Kelas: require('../models/kelas')(sequelize, DataTypes),
    KelasJadwalPelajaran: require('../models/kelas_jadwal_pelajaran')(sequelize, DataTypes),
    KelasTugas: require('../models/kelas_tugas')(sequelize, DataTypes),
    KelasWalikelas: require('../models/kelas_walikelas')(sequelize, DataTypes),
    Pelajaran: require('../models/pelajaran')(sequelize, DataTypes),
    Role: require('../models/role')(sequelize, DataTypes),
    Siswa: require('../models/siswa')(sequelize, DataTypes),
    SiswaTugas: require('../models/siswa_tugas')(sequelize, DataTypes),
    Tugas: require('../models/tugas')(sequelize, DataTypes),
    TugasStatus: require('../models/tugas_status')(sequelize, DataTypes),
    UserDetails: require('../models/user_details')(sequelize, DataTypes),
    User: require('../models/user')(sequelize, DataTypes)
};
db.models = {
    Berita: require('../models/berita')(sequelize, DataTypes),
    Guru: require('../models/guru')(sequelize, DataTypes,db.model),
    GuruPelajaran: require('../models/guru_pelajaran')(sequelize, DataTypes),
    Jurusan: require('../models/jurusan')(sequelize, DataTypes),
    Kelas: require('../models/kelas')(sequelize, DataTypes),
    KelasJadwalPelajaran: require('../models/kelas_jadwal_pelajaran')(sequelize, DataTypes),
    KelasTugas: require('../models/kelas_tugas')(sequelize, DataTypes),
    KelasWalikelas: require('../models/kelas_walikelas')(sequelize, DataTypes),
    Pelajaran: require('../models/pelajaran')(sequelize, DataTypes),
    Role: require('../models/role')(sequelize, DataTypes),
    Siswa: require('../models/siswa')(sequelize, DataTypes),
    SiswaTugas: require('../models/siswa_tugas')(sequelize, DataTypes),
    Tugas: require('../models/tugas')(sequelize, DataTypes),
    TugasStatus: require('../models/tugas_status')(sequelize, DataTypes),
    UserDetails: require('../models/user_details')(sequelize, DataTypes),
    User: require('../models/user')(sequelize, DataTypes),
    Tutorial: require('../models/tutorial')(sequelize,DataTypes)
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;