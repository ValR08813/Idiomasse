const Word = require('../models/word');

module.exports = {

    findAll: async (_, response) => {
        const words = await Word.findAll();
        response.json(words);
    },

    findOne: async (request, response) => {
        const id = parseInt(request.params.id, 10);
        const word = await Word.findOne(id);
        response.json(word);
    },

    save: async (request, response) => {
        try {
            const instance = new Author(request.body);
            const word = await instance.save();
            if (word) {
                //si la phrase n'existe pas on fait un insert, on créé une nouvelle phrase
                return response.status(201).json(word);
            }
            //sinon on update la phrase existante
            response.status(204).json('auteur updaté')

        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }

    },

    delete: async (request, response) => {
        try {
            const id = parseInt(request.params.id, 10);
            await new Word({ id }).delete();
            response.status(204).json('Mot supprimé');
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    }

}