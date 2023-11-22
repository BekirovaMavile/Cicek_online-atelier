const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
    'atelierdb', // Название базы данных
    // 'root', // Пользователь базы данных
    'vo5vxosn13r7j8hvg8wq',
    // 'mavile3103', // Пароль от БД
    'pscale_pw_ArnBHcNt40f4OBbw2P7PlBSDWuisNEnSNteU34VH65m',
    {
        // host: 'localhost',
        host: 'mysql://vo5vxosn13r7j8hvg8wq:pscale_pw_ArnBHcNt40f4OBbw2P7PlBSDWuisNEnSNteU34VH65m@aws.connect.psdb.cloud/atelierdb?ssl={"rejectUnauthorized":true}',
        dialect: 'mysql'
    }
);

// module.exports = new Sequelize(
//   'atelierdb', // Название базы данных
//   'Ibraim', // Пользователь базы данных
//   'Atelier_0809', // Пароль от БД
//   {
//       host: 'localhost',
//       dialect: 'mysql'
//   }
// );

// module.exports = new Sequelize(
//   "atelierdb", // Название базы данных
//   "root", // Пользователь базы данных
//   "Wersia1797", // Пароль от БД
//   {
//     host: "localhost",
//     dialect: "mysql",
//   }
// );
