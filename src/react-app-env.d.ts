/// <reference types="react-scripts" />
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    primary: string;
    secondary: string;
    background: string;
    backgroundLight: string;
    contrast: string;
  }
}
