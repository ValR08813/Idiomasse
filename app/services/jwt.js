require('dotenv').config();
const JWT = require('jsonwebtoken');


module.exports = {
    makeToken: userId => {
        try {
           return JWT.sign(
                {
                    data: userId
                },
                process.env.JWT_SECRET,
                {
                    algorithm: 'HS256',
                    expiresIn: '360m'
                }
            );
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw new Error(error.message);
        }
    },

    validateToken: token => {
        try {
            const truc = JWT.verify(
                token,
                process.env.JWT_SECRET,
                {
                    algorithms: ['HS256']
                }
            );
            
            return truc;
        } catch(error) {
            console.log(error);
            throw error;
            // throw new Error('validate error jwt, session expirée');
        }
    }
}