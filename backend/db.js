const { Sequelize } = require("sequelize");

// module.exports = new Sequelize(
//     'atelierdb', // Название базы данных
//     'root', // Пользователь базы данных
//     'mavile3103', // Пароль от БД
//     {
//         host: 'localhost',
//         dialect: 'mysql'
//     }
// );

module.exports = new Sequelize(
    'atelierdb', // Название базы данных
    'Ibraim', // Пользователь базы данных
    'Atelier_0809', // Пароль от БД
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

// module.exports = new Sequelize(
//   "atelierdb", // Название базы данных
//   "root", // Пользователь базы данных
//   "Wersia1797", // Пароль от БД
//   {
//     host: "localhost",
//     dialect: "mysql",
//   }
// );
