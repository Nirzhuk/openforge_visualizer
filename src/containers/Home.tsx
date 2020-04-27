import React, { FC, useState } from "react";
import ThreeRenderer from "../components/ThreeRenderer";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [model, setModel] = useState("test");
  const [error, setError] = useState(false);
  const container = document.querySelector("#stlViewer");
  return (
    <div>
      <button onClick={() => setModel("test")}>Model 1</button>
      <button onClick={() => setModel("test2")}>Model 2</button>
      <button
        onClick={() =>
          setModel("https://cdn.thingiverse.com/assets/7c/48/e2/6f/65/SW10.stl")
        }
      >
        Model 3
      </button>
      <ThreeRenderer container={container} onError={setError} model={model} />
      {error && <p style={{ color: "red" }}>Error al cargar un archivo</p>}
    </div>
  );
};

export default Home;
