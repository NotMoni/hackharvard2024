import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --title-color: #AFCBFF;   /* Pastel blue */
    --button-color: #FF9447;  /* Pastel orange */
    --button-hover-color: #FFC04D;
    --text-color: #001f3f;    /* Navy blue */
    --background-color: white;
  }

  body {
    background-color: var(--background-color);
    color: var(--text-color);
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  h1, h2, h3 {
    color: var(--title-color);
  }

  button {
    background-color: var(--button-color);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 1rem;
  }

  button:hover {
    background-color: var(--button-hover-color);
  }
`;

export default GlobalStyles;
