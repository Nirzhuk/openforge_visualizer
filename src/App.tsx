import React, { useContext } from "react";
import * as THREE from "three";
import { ThemeProvider } from "styled-components";
import { threeContext as AppContext, currentState } from "./context/main";
import { AppRoutes } from "./routes";
import { GlobalStyle, theme } from "./core/theme";

const App = () => {
  const context = useContext(AppContext);
  const { scene } = context;
  scene.background = new THREE.Color(theme.background);
  scene.name = "Escena principal";
  scene.add(new THREE.HemisphereLight(0xff5533, 1.5));

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={currentState}>
        <GlobalStyle />
        <AppRoutes />
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
