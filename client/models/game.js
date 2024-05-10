class GameModel {
    constructor() {
        this.games = { 'austin vs jack': [['x', 'o']] };
    }

    getGame(gameName) {
        return this.games[gameName] || null;
    }

    getGames() {
        return this.games;
    }

    saveGame(gameName, board) {
        this.games[gameName] = board;
    }
}

module.exports = GameModel;