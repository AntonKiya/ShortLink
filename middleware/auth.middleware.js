const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {

    if (req.method === 'OPTIONS') {
        next();
    };

    try {

                      // строка с токеном которую мы будет передавать с frontend
        const token = req.headers.authorization.split(' ')[1]  // "Bearer TOKEN"


        if (!token) {
            return res.status(401).json({ message: 'Нет авторизации!!' })
        };

        const decodedJWT = jwt.verify(token, config.get('jwtSecret'));

        req.user = decodedJWT;

        next();
        
    }catch (e) {
        return res.status(401).json({ message: e.message });
    }

};