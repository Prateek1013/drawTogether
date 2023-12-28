import { useEffect, useRef } from "react";

const Board = () => {
  const canvas_ref = useRef(null);
  useEffect(() => {
    if (!canvas_ref.current) return;
    const canvas=canvas_ref.current;
    const context=canvas.getContext('2d');

    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
  }, []);
  return <canvas ref={canvas_ref}></canvas>;
};

export default Board;
