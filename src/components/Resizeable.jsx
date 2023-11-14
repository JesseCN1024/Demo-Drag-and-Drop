import { useState, useEffect } from "react";

function Resizable({ width, height }) {
  const [innerWidth, setInnerWidth] = useState(100);
  const [innerHeight, setInnerHeight] = useState(80);

  const [resizeDirection, setResizeDirection] = useState();

  let startX, startY, startWidth, startHeight;

  useEffect(() => {
    setInnerWidth(width);
    setInnerHeight(height);
  }, [width, height]);

  const startResize = (e) => {
    startX = e.clientX;
    startY = e.clientY;
    startWidth = innerWidth;
    startHeight = innerHeight;

    setResizeDirection(e.target.dataset.direction);

    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResize);
  };

  const resize = (e) => {
    if (resizeDirection === "top") {
      setInnerHeight(startHeight - (e.clientY - startY));
    }
    // Handle other directions

    document.body.style.cursor = "col-resize"; // Change cursor
  };

  const stopResize = () => {
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResize);

    document.body.style.cursor = "default";
  };

  return (
    <div
      className="resizable"
      onMouseDown={startResize}
      style={{ width: innerWidth, height: innerHeight }}
    >
      <div data-direction="top" className="handle handle-n"></div>
      <div data-direction="right" className="handle handle-e"></div>
      {/* Other handles */}

      {/* Content */}
    </div>
  );
}

export default Resizable;
