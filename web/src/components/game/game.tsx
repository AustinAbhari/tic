import { useEffect, useState } from 'react';
import { StyledContainer, StyledGrid } from './styled-game';
import Square from '../square';
import { checkWinner } from '../../util/check-winner';


const Game = () => {
    const [xTurn, setXTurn] = useState<boolean>(true)
    const [winner, setWinner] = useState<string | null>(null)
    const [background, setBackground] = useState<string>('hotpink')
    const [grid, setGrid] = useState<board>([
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ])
    const handleMarker = (index: any) => {
        const tempGrid = [...grid];
        index = index.split('-')
        grid[index[0]][index[1]] = xTurn ? 'x' : 'o'
        setXTurn(!xTurn)
        setGrid(tempGrid)
        setWinner(checkWinner(tempGrid))
    }

    useEffect(() => {
        if (winner === null) return;

        const colorInterval = setInterval(() => {
            const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
            setBackground(randomColor);
        }, 300)

        return () => clearInterval(colorInterval);

    }, [winner])

    return (
        <StyledContainer background={background}>
            {winner !== null && <h1> THE WINNER IS {winner}</h1>}
            <StyledGrid>
                {
                    grid.map((row, rowIndex) => (
                        row.map((cell, colIndex) => {
                            const key = `${rowIndex}-${colIndex}`;
                            return <Square cell={cell} key={key} index={key} handleMarker={handleMarker} />
                        })
                    ))
                }
            </StyledGrid>
        </StyledContainer>
    );
}

type board = string[][];

export default Game;