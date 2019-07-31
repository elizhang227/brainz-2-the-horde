const db = require('./conn.js');

class Scores{
    constructor(id,kill_count,user_id){
        this.id  = id;
        this.kill_count = kill_count;
        this.user_id = user_id;
    }

    static async getHighScores(){
        try{
            const response = await db.any(`
            SELECT wave, kills, user_id, difficulty 
            FROM scores, game_modes
            WHERE game_modes.id = game_mode_id
            ORDER BY wave DESC
            LIMIT 10`)
            //console.log(response)
            return response;
        } catch(err) {
            return err.message;
        }
    }

    static async getRecentScores(){
        try{
            const response = await db.any(`
            SELECT wave, kills, user_id, difficulty
            FROM scores, game_modes
            WHERE game_modes.id = game_mode_id
            ORDER BY timestamp DESC
            limit 3`);
            return response;
        } catch(err) {
            return err.message;
        }
    }

    static async addScore(wave, kills, user_id, game_mode_id, timestamp){
        try {
            const response = await db.one(`
            INSERT INTO scores
                (wave, kills, user_id, game_mode_id, timestamp)
            VALUES
                (${wave}, ${kills}, ${user_id}, ${game_mode_id}, '${timestamp}')
            `);
            return response;
        } catch(err) {
            return err.message;
        }
    }

    static async getMyScores(id) {
        try {
            const response = await db.any(`
            SELECT wave, kills
            FROM scores
            WHERE user_id = ${id}`);
            return response;
        } catch(err) {
            return err.message;
        }
    }
}

module.exports = Scores;