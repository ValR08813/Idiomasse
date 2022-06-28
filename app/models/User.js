const { response } = require('express');
const client = require('../database.js');
const bcrypt = require('bcrypt');


class User {

    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    static async findAll() {
        try {
            const { rows } = await client.query('SELECT * FROM "user"');
            return rows.map(row => new User(row));
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

    static async findOne(id) {
        try {
            const { rows } = await client.query('SELECT * FROM "user" WHERE id=$1', [id]);
            if (rows[0]) {
                return new User(rows[0]);
            }
            return null;

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

    async addUser(mail, password, pseudo) {

        try {
            const checkMail = await client.query(`SELECT * FROM "user" WHERE mail=$1`, [mail]);

            if (!checkMail.rows[0]) {

                const checkPseudo = await client.query(`SELECT * FROM "user" WHERE pseudo=$1`, [pseudo]);

                if (!checkPseudo.rows[0]) {
                    const hashedPwd = await bcrypt.hash(password, 10);

                    const { rows } = await client.query(' INSERT INTO "user"(mail, lastname, firstname, pseudo, password) VALUES ($1, $2, $3, $4, $5) RETURNING id', [this.mail, this.lastname, this.firstname, this.pseudo, hashedPwd]);

                    this.id = rows[0].id;
                    delete this.password;
                    delete this.password_confirmation;
                    return this;
                } else {
                    throw new Error('Ce pseudo est déjà pris.');
                }

            } else {
                throw new Error('Un utilisateur avec cet email existe déjà.');

            }


        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

    static async findByMail(mail, password) {
        try {
            const checkUser = await client.query('SELECT * FROM "user" WHERE mail=$1', [mail]);

            if (checkUser.rows[0]) {
                const isPwdValid = await bcrypt.compare(password, checkUser.rows[0].password);

                if (isPwdValid === false) {
                    throw new Error('mot de passe invalide');
                } else {
                    const user = new User(checkUser.rows[0]);
                    delete user.password;
                    return user;
                }

            } else {
                throw new Error('mail invalide');

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
            const { rows } = await client.query('SELECT FROM "user" WHERE id=$1', [id]);

            if (rows[0] === undefined) {
                throw new Error(`il n'existe aucun compte avec cet id`);

            } else {
                await client.query('DELETE FROM "user" WHERE id=$1', [id]);

            }

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

}

module.exports = User;