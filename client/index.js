const express = require('express');
const app = express();
const router = express.Router();

class GameModel {
    constructor() {
        this.games = { 'austin vs jack': [['x', 'o']] }
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

    //delete
    //CRUD
}

class GameController {
    constructor() {
        this.model = new GameModel()
    }

    getGame(req, res) {
        const game = this.model.getGame(req.params.id)
        res.status(200).send(game)
    }

    getGames(req, res) {
        res.status(200).send(this.model.getGames())
    }

    saveGame(req, res) {
        if (!req || !req.body.gameName || !req.body.board) {
            res.status(400).send('come on man, do better')
        }

        const { gameName, board } = req.body;
        this.model.saveGame(gameName, board);

        res.status(200).send('wow, cool game dude')
    }

}

const gameController = new GameController()

router.get('/game/:gameName', gameController.getGame.bind(gameController))
router.get('/games', gameController.getGames.bind(gameController))
router.post('/games', gameController.saveGame.bind(gameController))

app.use(express.json(), router)

app.listen(3001, () => console.log('Server started'))