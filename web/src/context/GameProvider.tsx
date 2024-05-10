import React, { createContext, useContext, useEffect, useState } from 'react';

type Game = object;

const GameContext = createContext<Game>({});

export const GameProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [games, setGames] = useState<Game>({})

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

    return (
        <GameContext.Provider value={games}>
            {children}
        </GameContext.Provider>
    )
}


export const useGameContext = (): Game => useContext(GameContext);
