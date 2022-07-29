const db = require('../database');

class Word {

    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    static async findAll() {
        try {
            const { rows } = await db.query('SELECT * FROM word');
            return rows.map(row => new Word(row));
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

    static async findOne(id) {
        try {
            const { rows } = await db.query('SELECT * FROM word WHERE id=$1', [id]);
            if (rows[0]) {
                return new Word(rows[0]);
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
            const text = this.text.toLowerCase();
            console.log("thisdansmodel =", this)
            const checkWord = await db.query('SELECT * FROM word WHERE text=$1', [text]);

            console.log('wordModel', text);
            if (!checkWord.rows[0]) {
                const { rows } = await db.query('INSERT INTO word (text, language, trad, article) VALUES ($1, $2, $3, $4) RETURNING id', [text, this.language, this.trad, this.article])
                this.id = rows[0].id;
                console.log('type2this', typeof this)
                return this;
            } else {
                throw Error('Mot déjà ajoutée');

            }

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

    async updateWord(word) {

    }

    static async delete(word) {
        try {
            console.log('word =', word.word);
            const reqWord = word.word.toLowerCase();
            const respWord = await db.query('SELECT FROM word WHERE text=$1', [word.word.toLowerCase()]);
            // await db.query('DELETE FROM word WHERE wordtext=$1', [reqWord]);
            console.log('reqWord =', word.word.toLowerCase());
            console.log('respWord =', respWord);


            return reqWord;
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
}

module.exports = Word;