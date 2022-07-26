const Language = require('../models/language');

module.exports = {

    findAll: async (_, response) => {
        const languages = await Language.findAll();
        response.json(languages);
    },

    findOne: async (request, response) => {
        const id = parseInt(request.params.id, 10);
        const language = await Language.findOne(id);
        response.json(language);
    },

    save: async (request, response) => {
        try {
           
            const instance = new Language(request.body);
            const language = await instance.save();
            if (language) {
                return response.status(201).json(language);
            }
            response.status(204).json('language ajouté')
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },

    deleteLanguage: async (request, response) => {
        try {
            const id = parseInt(request.params.id, 10);
            // await Language.delete(id);
            // response.status(204).json(`langue supprimée`);

            const language = await Language.delete(id);
            response.status(200).json(`langue "${language}" supprimée`);

        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    }
}