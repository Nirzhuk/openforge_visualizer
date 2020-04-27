import { DefaultTheme, createGlobalStyle } from "styled-components";

const theme: DefaultTheme = {
  primary: "#F8F9F7",
  secondary: "#A7D2EA",
  contrast: "#5C89EC",
  backgroundLight: "#6980C5",
  background: "#212634",
};

const GlobalStyle = createGlobalStyle`
body {
  background-color: ${(props) => props.theme.background} !important
}
`;

export { GlobalStyle, theme };
