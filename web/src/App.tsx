import React, { useEffect, useState } from 'react';
import { StyledContainer, StyledGrid } from './components/styled-app';
import Square from './components/square/square';
import { checkWinner } from './util/check-winner';

const App = () => {
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

export default App;

/*
 - React fund
 - learn typescript
 - using the MVC
 - Work on css
 - add cool stuff
   - Websockets
   - Learn more about bundling
 - Coding foundations 
 - DB 
*/