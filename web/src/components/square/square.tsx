import React from 'react';
import { StyledSquare } from './styled-square';


const Square = ({ cell, handleMarker, index }: SquareProps) => {
    return <StyledSquare onClick={() => handleMarker(index)}> {cell} </StyledSquare>
}


interface SquareProps {
    handleMarker: Function;
    index: string;
    cell: string;
}

export default Square;