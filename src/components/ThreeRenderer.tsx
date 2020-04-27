import React, { FC, useRef, useContext, useEffect } from "react";
import STLViewer, { removeEntity } from "../core/threejs/STLViewer";
import { threeContext } from "../context/main";
import usePrevious from "../hooks/usePrevious";
import styled from "styled-components";

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
    <ThreeContainerPadding>
      <ThreeContainer id={containerId}></ThreeContainer>
    </ThreeContainerPadding>
  );
};

const ThreeContainer = styled.div`
  width: 500px;
  height: 500px;
  :focus {
    outline: 0;
  }
`;
const ThreeContainerPadding = styled.div`
  border: solid 2px ${(props) => props.theme.backgroundLight};
  padding: 10px;
  border-radius: 10px;
  margin: 0 auto;
  width: 500px;
  height: 500px;
`;

export default ThreeRenderer;
