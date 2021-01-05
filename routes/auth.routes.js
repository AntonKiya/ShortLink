const {Router} = require('express');
const User = require('../models/User');
const router = Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
//библиотека для валидации введенных данных
const {check, validationResult} = require('express-validator');


//api/auth
router.post('/register',
    [
    check('email', 'Неккоректный email').isEmail(),
    check('password', 'Минимальная длинна пароля 6 символов').isLength({min: 6})
    ],
    async (req, res) => {
    try {

        console.log('Body: ' + req.body);

        //проверяем нашли ли валидаторы какие-либо ошибки
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            //возвращаем на фронтенд ошибки пойманные валидатором
            return res.status(400).send({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации!'
            })
        }

        const {email, password} = req.body;

        //смотрим, есть ли уже такой пользователь
        const condidade = await User.findOne({ email: email });

        if (condidade) {
            return res.status(400).json({message: 'Такой пользователь уже существует'})
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ email: email, password: hashedPassword});

        await user.save();

        res.status(201).json({message: 'Пользователь создан'});

    }catch (e) {
        res.status(500).json({message: 'Что-то пошло не так в блоке регистрации ' + e.message});
    }
});



//api/login
router.post('/login',[
    check('email', 'Некорректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            //возвращаем на фронтенд мойманные валидатором ошибки
            return res.status(400).send({
                errors: errors.array(),
                message: 'Некорректные данные при входе в систему'
            });
        };

        const {email, password} = req.body;

        const user = await User.findOne({email: email});

        if (!user) {
            return res.status(400).json({message: 'Пользователя с таким email не существует'})
        }

        //сраниваем пароли
        const compliance =  await bcrypt.compare(password, user.password);

        if (!compliance) {
            return res.status(400).json({message: 'Неверный пароль, попробуйте снова'})
        }

        //создаем токен
        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        );

        //возвращаем токен
        res.json({token, userId: user.id});

    }catch (e) {
        res.status(500).json({message: 'Что-то пошло не так в блоке авторизации '} + e.message);
    }
});

module.exports = router;
