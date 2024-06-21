const GameModel = require('../models/game');

class GameController {
    constructor() {
        this.model = new GameModel();
    }

    getGame(req, res) {
        const game = this.model.getGame(req.params.gameName);
        if (game) {
            res.status(200).send(game);
        } else {
            res.status(404).send("Game not found");
        }
    }

    getGames(req, res) {
        const games = this.model.getGames();
        res.status(200).send(games);
    }

    saveGame(req, res) {
        const { gameName, board } = req.body;
        if (!gameName || !board) {
            res.status(400).send('Invalid data');
            return;
        }

        this.model.saveGame(gameName, board);
        const games = this.model.getGames()
        res.status(200).send(games);
    }
}

module.exports = GameController;