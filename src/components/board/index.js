import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
const Board = () => {
  const canvas_ref = useRef(null);
  const draw = useRef(false);
  const activemenu = useSelector((state) => state.menu.activemenu);
  const { color, size } = useSelector((state) => state.toolbox[activemenu]);

  useEffect(() => {
    if (!canvas_ref) return;
    const canvas = canvas_ref.current;
    const context = canvas.getContext("2d");

    context.strokeStyle = color;
    context.lineWidth = size;
  }, [color, size]);

  useEffect(() => {
    // this is for mounting
    if (!canvas_ref.current) return;
    const canvas = canvas_ref.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handlemousedown = (e) => {
      draw.current = true;
      context.beginPath();
      context.moveTo(e.clientX, e.clientY);
    };
    const handlemousemove = (e) => {
      if (!draw.current) return;
      context.lineTo(e.clientX, e.clientY);
      context.stroke();
    };
    const handlemouseup = () => {
      draw.current=false;
    };

    canvas.addEventListener("mousedown", handlemousedown);
    canvas.addEventListener("mousemove", handlemousemove);
    canvas.addEventListener("mouseup", handlemouseup);
    return () => {
      canvas.removeEventListener("mousedown", handlemousedown);
      canvas.removeEventListener("mousemove", handlemousemove);
      canvas.removeEventListener("mouseup", handlemouseup);
    };
  }, []);
  return <canvas ref={canvas_ref}></canvas>;
};

export default Board;
