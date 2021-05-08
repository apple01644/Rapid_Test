import styled from 'styled-components';

const TextFrame = styled.div`
  width: 51vmin;
  height: 51vmin;
  display: flex;
`;

const TextInput = styled.input`
  width: 51vmin;
  height: 51vmin;
  padding: 1px;

  font-size: 3vmin;

  border: 1px solid black;
  font-family: 'Noto Serif KR', serif;

  text-align: center;
`;

const TextOverlay = styled.span`
  position: absolute;
  width: 51vmin;
  height: 51vmin;
  padding: 1px;

  font-size: 3vmin;

  border: 1px solid red;
  font-family: 'Noto Serif KR', serif;

  text-align: center;

  pointer-events: none;
  overflow: hidden;

  display: flex;
  justify-content: center;
`;

export { TextFrame, TextInput, TextOverlay };
