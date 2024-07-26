import { useEffect, useState } from "react";
import { StyledContainer, StyledGrid } from "./styled-game";
import Square from "../square";
import { checkWinner } from "../../util/check-winner";
import { useGameContext } from "../../context/GameProvider";
import styled from "styled-components";

const GamesContainer = styled.div`
	width: 250px;
	background: black;
	height: 100vh;
	h1 {
		color: white;
	}
`;

const TicTacToeContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	flex: 1;
`;

const SaveGameForm = styled.form`
	display: flex;
`;

const Game = () => {
	const { games, saveGame } = useGameContext();
	const [showSavedGame, setShowSavedGame] = useState("");
	const [gameName, setGameName] = useState("");
	const [xTurn, setXTurn] = useState<boolean>(true);
	const [winner, setWinner] = useState<string | null>(null);
	const [background, setBackground] = useState<string>("hotpink");
	const [grid, setGrid] = useState<board>([
		["", "", ""],
		["", "", ""],
		["", "", ""],
	]);

	const handleMarker = (index: any) => {
		const tempGrid = [...grid];
		index = index.split("-");
		grid[index[0]][index[1]] = xTurn ? "x" : "o";
		setXTurn(!xTurn);
		setGrid(tempGrid);
		setWinner(checkWinner(tempGrid));
	};

	const handleShowSavedGame = async (name: string) => {
		console.log(name);
		// setShowSavedGame(name);
		const newGame = games.find((c) => c.name === name);
		console.log(newGame);
		if (newGame)
			setGrid(
				newGame.board || [
					["", "", ""],
					["", "", ""],
					["", "", ""],
				]
			);
	};

	useEffect(() => {
		if (winner === null) return;

		// const colorInterval = setInterval(() => {
		//     const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
		//     setBackground(randomColor);
		// }, 300)

		// return () => clearInterval(colorInterval);
	}, [winner]);

	const handleSaveEvent = (e: any) => {
		e.preventDefault();
		saveGame(gameName, grid);
	};

	return (
		<StyledContainer background={background}>
			<GamesContainer>
				{games.map((game, i) => (
					<h1 key={i}>
						<button onClick={() => handleShowSavedGame(game.name)}>
							{game.name}
						</button>
					</h1>
				))}
			</GamesContainer>

			<TicTacToeContainer>
				{
					winner !== null && (
						<SaveGameForm>
							<label>
								NAME YOUR GAME
								<input
									type="text"
									onChange={(e) => setGameName(e.target.value)}
								/>
								<button onClick={(e) => handleSaveEvent(e)}>Save</button>
							</label>
						</SaveGameForm>
					)
					// <h1> THE WINNER IS {winner}</h1>
				}
				<StyledGrid>
					{grid.map((row, rowIndex) =>
						row.map((cell, colIndex) => {
							const key = `${rowIndex}-${colIndex}`;
							return (
								<Square
									cell={cell}
									key={key}
									index={key}
									handleMarker={handleMarker}
								/>
							);
						})
					)}
				</StyledGrid>
			</TicTacToeContainer>
		</StyledContainer>
	);
};

type board = string[][];

export default Game;
