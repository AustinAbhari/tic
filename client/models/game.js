class GameModel {
    constructor() {
        this.games = [{ gameName: 'austin vs jack', board: [['x', 'o', 'o'], ['x', 'o', 'o'], ['x', 'o', 'o']] }];
    }

    getGame(gameName) {
        return this.games[gameName] || null;
    }

    getGames() {
        return this.games;
    }

    saveGame(gameName, board) {
        this.games.push({ gameName, board });
    }
}

module.exports = GameModel;