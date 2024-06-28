import styled from 'styled-components';

export const StyledContainer = styled.div<StyledContainerProps>`
  height: 100vh;
  width: 100vw;
  background: ${(props) => props.background};
  display: flex;
 justify-content: space-between;
  align-items: center;
`


export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 100px);
  gap: 1px;
`;

interface StyledContainerProps {
  background: string;
}
