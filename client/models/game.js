const { Client } = require('pg');

class GameModel {
    constructor() {
        this.client = new Client({
            user: 'austin',
            host: 'localhost',
            database: 'tac',
            password: '',
            port: 5432,
        });

        this.client.connect();

        // Create table if it doesn't exist
        this.client.query(`
            CREATE TABLE IF NOT EXISTS games (
                name VARCHAR(255) PRIMARY KEY,
                board TEXT
            )
        `);
    }


    getGame(gameName) {
        return this.games[gameName] || null;
    }

    async getGames() {
        try {
            const games = await this.client.query('SELECT * FROM games');
            
            return games.rows;
        } catch (error) {
            console.error('Error fetching games', error);
            return [];
        }
    }

    saveGame(gameName, board) {
        this.games.push({ gameName, board });
    }
}

module.exports = GameModel;