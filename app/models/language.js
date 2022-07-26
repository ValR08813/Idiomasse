const db = require('../database');

class Language {

    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    static async findAll() {
        try {
            const { rows } = await db.query('SELECT * FROM language');
            return rows.map(row => new Language(row));
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

    static async findOne(id) {
        try {
            const { rows } = await db.query('SELECT * FROM language WHERE id=$1', [id]);
            if (rows[0]) {
                return new Language(rows[0]);
            }
            return null;

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

    async save() {
        try {
            const name = this.name.toLowerCase();
            const checkLanguage = await db.query('SELECT * FROM language WHERE name=$1', [name]);

            console.log('nameModel', name);


            if (!checkLanguage.rows[0]) {
                const { rows } = await db.query('INSERT INTO language (name) VALUES ($1) RETURNING id', [this.name]);
                this.id = rows[0].id;
                return this;
            } else {
                throw Error('Langue déjà ajoutée');

            }


        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

    static async delete(id) {
        try {
            const language = await db.query('SELECT name FROM language WHERE id=$1', [id])
            await db.query('DELETE FROM language WHERE id=$1', [id]);
            return language.rows[0].name;
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
}

module.exports = Language;