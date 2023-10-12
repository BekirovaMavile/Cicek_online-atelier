const handleNewUser = async (req, res) => {
    const {user, pwd} = req.body;
    if (!user || !pwd) return res.status(400).json({'message': 'Username and password are required.'});
    //Проверка на дубликацию пользователся в БД
    const duplicate = usersDB.users.find(person => person.username == user); // Переписать строку
    if (duplicate) return res.sendStatus(409); // Conflict

    try {
        // Шифруем пароль
        const hashedPwd = await bcrypt.hash(pwd, 10);
        // Добавление нового юзера
        const newUser = {"username": user, "password": hashedPwd};
        userDB.setUsers([...usersDB.users, newUser]);

    } catch (err) {
        res.status(500).json({'message': err.message})
    }
}