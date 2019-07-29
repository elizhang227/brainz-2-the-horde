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
            SELECT wave, kills, user_id 
            FROM scores 
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
            SELECT wave, kills, user_id
            FROM scores
            ORDER BY timestamp DESC
            limit 3`);
            return response;
        } catch(err) {
            return err.message;
        }
    }

}

module.exports = Scores;