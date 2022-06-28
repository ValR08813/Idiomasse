const User = require('../models/User');
const jwt = require('../services/jwt');


module.exports = {

    findAll: async (_, response) => {
        const user = await User.findAll();
        response.json(user);
    },

    findOne: async (request, response) => {
        try {
            const id = parseInt(request.params.id, 10);
            console.log("id", id);
            const user = await User.findOne(id);
            response.json(user);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }

    },

    validSignup: async (request, response) => {
        try {

            const mail = request.body.mail;
            const password = request.body.password;
            const pseudo = request.body.pseudo;
            const instance = new User(request.body);
            const user = await instance.addUser(mail, password, pseudo);

            const token = jwt.makeToken(user.id);

            return response.setHeader('Authorization', 'Bearer ' + token).status(201).json(user);

        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }

    },

    validLogin: async (request, response) => {
        try {
            const mail = request.body.mail;
            const password = request.body.password;
            const user = await User.findByMail(mail, password);
            const token = jwt.makeToken(user.id);
            return response.setHeader('Authorization', 'Bearer ' + token).status(201).json(user);

        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },

    deleteUser: async (request, response) => {
        try {
            const id = request.userId;
            await User.delete(id);
            response.json(`L'utilisateur ayant l'id ${id} a bien été supprimé.`);


            
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    }

}