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
            const { rows } = await db.query('SELECT * FROM language WHERE id=', [id]);
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
            if (this.id) {
                await db.query('SELECT * FROM update_language()', [this]);
            } else {
                const { rows } = await db.query('SELECT * FROM add_language()', [this])
                this.id = rows[0].id;
                return this;
            }
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

    async delete() {
        try {
            await db.query('DELETE FROM language WHERE id=', [this.id]);
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
}

module.exports = Language;