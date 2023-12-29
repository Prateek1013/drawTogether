import { MENU_ITEMS } from "@/constants";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { actionItemClick } from "@/slices-redux/menuSlice";
const Board = () => {
  const canvas_ref = useRef(null);
  const draw = useRef(false);
  const {activemenu, actionmenu }= useSelector((state) => state.menu);
  const { color, size } = useSelector((state) => state.toolbox[activemenu]);
  const dispatch=useDispatch();

  useEffect(()=>{
    if (!canvas_ref) return;
    const canvas = canvas_ref.current;
    const context = canvas.getContext("2d");
    if(actionmenu===MENU_ITEMS.DOWNLOAD)
    {
      const URL=canvas.toDataURL();
      const a_tag=document.createElement('a');
      a_tag.href=URL;
      a_tag.download='sketch.jpg'; 
      a_tag.click();
    }
    dispatch(actionItemClick(null));
  },[actionmenu])

  useEffect(() => {
    if (!canvas_ref) return;
    const canvas = canvas_ref.current;
    const context = canvas.getContext("2d");

    context.strokeStyle = color;
    context.lineWidth = size;
  }, [color, size]);

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
    };
    const handlemousemove = (e) => {
      if (!draw.current) return;
      context.lineTo(e.clientX, e.clientY);
      context.stroke();
    };
    const handlemouseup = () => {
      draw.current = false;
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
