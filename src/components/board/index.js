import { MENU_ITEMS } from "@/constants";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionItemClick } from "@/slices-redux/menuSlice";
import { socket } from "@/socket";
const Board = () => {
  const canvas_ref = useRef(null);
  const draw = useRef(false);
  const { activemenu, actionmenu } = useSelector((state) => state.menu);
  const { color, size } = useSelector((state) => state.toolbox[activemenu]);
  const dispatch = useDispatch();
  const canvasHistory = useRef([]);
  const historyPtr = useRef(0);
  useEffect(() => {
    if (!canvas_ref) return;
    const canvas = canvas_ref.current;
    const context = canvas.getContext("2d");
    if (actionmenu === MENU_ITEMS.DOWNLOAD) {
      const URL = canvas.toDataURL();
      const a_tag = document.createElement("a");
      a_tag.href = URL;
      a_tag.download = "sketch.jpg";
      a_tag.click();
    } else if (actionmenu === MENU_ITEMS.UNDO) {
      if (historyPtr.current > 0) historyPtr.current -= 1;
      const imgData = canvasHistory.current[historyPtr.current];
      context.putImageData(imgData, 0, 0);
    } else if (actionmenu === MENU_ITEMS.REDO) {
      if (historyPtr.current < canvasHistory.current.length - 1)
        historyPtr.current += 1;
      const imgData = canvasHistory.current[historyPtr.current];
      context.putImageData(imgData, 0, 0);
    }
    dispatch(actionItemClick(null));
  }, [actionmenu]);

  useEffect(() => {
    if (!canvas_ref) return;
    const canvas = canvas_ref.current;
    const context = canvas.getContext("2d");

    context.strokeStyle = color;
    context.lineWidth = size;
    socket.on("any_changeconfig", (arg) => {
      context.strokeStyle = arg.color;
      context.lineWidth = arg.size;
    });
  }, [color, size]);
  if (typeof window !== "undefined") {
    useLayoutEffect(() => {
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
        socket.emit("beginPath", { x: e.clientX, y: e.clientY });
      };
      const handlemousemove = (e) => {
        if (!draw.current) return;
        context.lineTo(e.clientX, e.clientY);
        context.stroke();
        socket.emit("drawPath", { x: e.clientX, y: e.clientY });
      };
      const handlemouseup = () => {
        draw.current = false;
        const currBoardImg = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        canvasHistory.current.push(currBoardImg);
        historyPtr.current = canvasHistory.current.length - 1;
      };

      canvas.addEventListener("mousedown", handlemousedown);
      canvas.addEventListener("mousemove", handlemousemove);
      canvas.addEventListener("mouseup", handlemouseup);
      socket.on("anything_path", (arg) => {
        context.beginPath();
        context.moveTo(arg.x, arg.y);
      });

      socket.on("anything_draw", (arg) => {
        context.lineTo(arg.x, arg.y);
        context.stroke();
      });

      return () => {
        canvas.removeEventListener("mousedown", handlemousedown);
        canvas.removeEventListener("mousemove", handlemousemove);
        canvas.removeEventListener("mouseup", handlemouseup);

        socket.off("anything_path", (arg) => {
          context.beginPath();
          context.moveTo(arg.x, arg.y);
        });

        socket.off("anything_draw", (arg) => {
          context.lineTo(arg.x, arg.y);
          context.stroke();
        });
      };
    }, []);
  }
  return <canvas ref={canvas_ref}></canvas>;
};

export default Board;
