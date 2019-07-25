const db = require('./conn');

class Users {
    constructor(id, first_name, last_name, email, password) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }

    static async checkUser(email) {
        try {
            const response = db.result(`
                SELECT *
                FROM users 
                WHERE email = $1
            `, [email]);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    async addUser(hashPW) {
        try {
            const response = await db.result(`
                INSERT INTO users
                    (f_name, l_name, email, password)
                VALUES
                    ($1,$2,$3,$4)`,
                [this.first_name, this.last_name, this.email, hashPW]);
            return response;
        } catch (err) {
            return err.message;
        }
    }
}

module.exports = Users;