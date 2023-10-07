const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
    'atelierdb', // Название базы данных
    'Ibraim', // Пользователь базы данных
    'Atelier_0809', // Пароль от БД
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);