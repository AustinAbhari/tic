const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();

const GameController = require('./controllers/game-controller')

const gameController = new GameController()

app.use(cors());

router.get('/game/:gameName', gameController.getGame.bind(gameController))
router.get('/games', gameController.getGames.bind(gameController))
router.post('/games', gameController.saveGame.bind(gameController))

app.use(express.json(), router)

app.listen(3001, () => console.log('Server started'))