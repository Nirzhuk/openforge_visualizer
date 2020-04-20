import React, { FC, useRef, useContext, useEffect } from "react";
import STLViewer, { removeEntity } from "../core/threejs/STLViewer";
import { threeContext } from "../context/main";
import usePrevious from "../hooks/usePrevious";

interface ThreeRendererProps {
  model: string;
  container: Element | undefined | null;
  onError: (...args: any[]) => void;
}

const ThreeRenderer: FC<ThreeRendererProps> = ({
  container,
  model,
  onError,
}) => {
  const context = useContext(threeContext);
  const { renderer, containerId } = context;
  const inputRef = useRef<HTMLElement | null>(null);

  const previousModel = usePrevious(model) || "";
  useEffect(() => {
    if (container) {
      removeEntity({ context, model: previousModel });
      STLViewer({ context, container, model, onError });
    }
    return () => {};
  }, [model, context, onError, container, previousModel]);
  useEffect(() => {
    inputRef.current = document.querySelector("#stlViewer");
    renderer.setSize(
      inputRef.current!.clientWidth,
      inputRef.current!.clientHeight
    );
    STLViewer({ context, container: inputRef!.current!, model, onError });
  }, []);

  return (
    <div
      style={{ margin: "0 auto", width: "500px", height: "500px" }}
      id={containerId}
    ></div>
  );
};

export default ThreeRenderer;
