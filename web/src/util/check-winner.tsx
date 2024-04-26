export const checkWinner = (board: board) => {
    const lines = [
        // Rows
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // Columns
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // Diagonals
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        const [aRow, aCol] = a;
        const [bRow, bCol] = b;
        const [cRow, cCol] = c;

        if (
            board[aRow][aCol] &&
            board[aRow][aCol] === board[bRow][bCol] &&
            board[aRow][aCol] === board[cRow][cCol]
        ) {
            return board[aRow][aCol]
        }
    }

    return null;
}

type board = string[][];