import React, { createContext, useContext, useEffect, useState } from 'react';

interface Game {
    gameName: string;
    board: string[][];
}

type Games = Game[];

interface GameContextType {
    games: Games;
    saveGame: (gameName: string, board: string[][]) => void;
    getGame: (gameName: string) => void;
}

const GameContext = createContext<GameContextType>({
    games: [],
    saveGame: () => { },
    getGame: () => { }
});

export const GameProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [games, setGames] = useState<Games>([])

    useEffect(() => {
        fetchGames();
    }, [])

    const fetchGames = async () => {
        try {
            const response = await fetch('http://127.0.0.1:3001/games');
            if (!response.ok) {
                throw new Error('OHHH NNOOOOOOO')
            }
            const data = await response.json();
            setGames(data);
        } catch (error) {
            console.error("There was something wrong with getting the game data", error)
        }
    }

    const saveGame = async (gameName: string, board: string[][]) => {
        try {
            const response = await fetch('http://127.0.0.1:3001/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ gameName, board })
            })

            if (!response.ok) {
                throw new Error('OHHHH NOOOOOOO');
            }
            const data = await response.json();
            setGames(data)
        } catch (error) {
            console.error("THERE BE SUMTING WRONG WITH DAT", error)
        }
    }

    const getGame = async (gameName: string) => {
        try {
            const response = await fetch(`http://127.0.0.1:3001/game/${gameName}`);
            if (!response.ok) {
                throw new Error('OHHH NNOOOOOOO')
            }
            const data = await response.json();
            return data;
        } catch (e) {
            console.error("THERE BE SUMTING WRONG WITH DAT", e);
        }
    }

    return (
        <GameContext.Provider value={{ games, saveGame, getGame }}>
            {children}
        </GameContext.Provider>
    )
}


export const useGameContext = (): GameContextType => useContext(GameContext);
